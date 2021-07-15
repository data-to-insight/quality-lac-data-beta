import * as GovUK from 'govuk-react';
import { Spinner } from '@govuk-react/icons';
import { useCallback, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { handleUploaded903Data, loadErrorDefinitions, loadPyodide } from './../api';
import Validator from "./Validator";
import Uploader from "./Uploader";
import { ErrorSelected, UploadedFile, UploadedFilesCallback, ValidatedData } from '../types';
import { childColumnName } from '../config';

export default function Dashboard() {
  const [pythonLoaded, setPythonLoaded] = useState(false);
  const [fileContents, setFileContents] = useState<Array<UploadedFile>>([]);
  const [uploadErrors, setUploadErrors] = useState<Array<any>>([]);
  const [validatedData, setValidatedData] = useState<ValidatedData | null>();
  const [selectedErrors, setSelectedErrors] = useState<Array<ErrorSelected>>([]);

  useEffect(() => {
    (async () => {
      await loadPyodide();
      let selectedErrors = await loadErrorDefinitions();
      setSelectedErrors(selectedErrors);
      setPythonLoaded(true);
    })();
  }, [])

  const addFileContent = useCallback<UploadedFilesCallback>(uploadedFile => {
    fileContents.push(uploadedFile); // We have to push to the old state in case the callback isn't updated in children
    setFileContents([...fileContents]);
  }, [fileContents])

  const clearAndUpload = useCallback(() => {
    setUploadErrors([]);
    setValidatedData(null);
    setFileContents([]);
  }, [])

  const runValidation = useCallback(async () => {
    setUploadErrors([]);
    setPythonLoaded(false);
    let [newValidatedData, pythonErrors] = await handleUploaded903Data(fileContents, selectedErrors);
    if (pythonErrors.length === 0) {
      setValidatedData(newValidatedData);
    } else {
      clearAndUpload();
      setUploadErrors(pythonErrors)
    }
    setPythonLoaded(true);
  }, [fileContents, selectedErrors, clearAndUpload])

  const downloadCSVs = useCallback(() => {
    let childSummaryRows = [["ChildID", "ErrorCode", "ErrorDescription", "ErrorFields"]];
    let errorCountRows = [['ErrorCode', 'ErrorDescription', 'NumErrors']];
    let errorCounts = new Map();
    validatedData?.data.forEach((table, tableName) => {
      let errors = validatedData.errors.get(tableName);
      table.forEach(dataRow => {
        let index = dataRow.get('Index') as number;
        let child = dataRow.get(childColumnName) as string;
        let errorList = errors?.get(index);
        errorList?.forEach(errorCode => {
          let errorDefn = validatedData.errorDefinitions.get(errorCode) as Map<string, any>;
          let errorFields = errorDefn?.get('affected_fields')?.toString();
          childSummaryRows.push([child, errorCode, errorDefn?.get("description") as string, errorFields as string]);

          errorCounts.set(errorCode, errorCounts.has(errorCode) ? errorCounts.get(errorCode) + 1 : 1)
        })
      })
    })

    errorCounts.forEach((numErrors, errorCode) => {
      errorCountRows.push([errorCode, validatedData?.errorDefinitions.get(errorCode)?.get('description'), numErrors]);
    })

    let childErrorContent = new Blob([childSummaryRows.map(r => r.join(",")).join('\n')], {type: 'text/csv'});
    saveAs(childErrorContent, 'ChildErrorSummary.csv');

    let errorSummaryContent = new Blob([errorCountRows.map(r => r.join(",")).join('\n')], {type: 'text/csv'});
    saveAs(errorSummaryContent, 'ErrorCounts.csv');

  }, [validatedData])

  const toggleErrorSelection = useCallback(toggledError => {
    let newSelectedErrors: Array<ErrorSelected> = [];
    for (let error of selectedErrors) {
      let errorCopy = { ...error }
      if (errorCopy.code === toggledError.code) {
        errorCopy.selected = !errorCopy.selected;
      }
      newSelectedErrors.push(errorCopy);
    }

    setSelectedErrors(newSelectedErrors);
  }, [selectedErrors, setSelectedErrors])

  return (
    <>
    {validatedData
      ? <Validator validatedData={validatedData} />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} uploadErrors={uploadErrors} selectedErrors={selectedErrors} setSelectedErrors={setSelectedErrors}/>
    }

    <LoadingBox loading={(!pythonLoaded) as boolean}>
      <GovUK.Details summary={`Validation Rules (${selectedErrors.filter(e => e.selected).length} selected, ${selectedErrors.filter(e => !e.selected).length} unselected)`}>
        {selectedErrors.map(error => <GovUK.Checkbox key={error.code} checked={error.selected} onChange={() => toggleErrorSelection(error)}>{error.code} - {error.description}</GovUK.Checkbox>)}
      </GovUK.Details> 

      <div style={{marginRight: '10%', display: 'inline'}}>
        <GovUK.Button onClick={runValidation}>Validate</GovUK.Button>
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        <GovUK.Button onClick={clearAndUpload}>Clear Data and Reupload</GovUK.Button>
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        {validatedData
          ? <GovUK.Button onClick={downloadCSVs}>Download CSVs</GovUK.Button>
          : <GovUK.Button buttonColour='gray' disabled>Download CSVs</GovUK.Button>
        }
      </div>
    </LoadingBox>
    </>
  )
}

function LoadingBox({children, loading}: any) {
  if (loading) {
    return (
      <div style={{ position: 'relative', pointerEvents: 'none'}}>
        <div style={{width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          <div style={{width: '100%', textAlign: 'center', height: '25px', fontSize: '24px'}}>Loading Python...</div>
          <Spinner style={{width: '50px', height: '50px', display: 'block'}} />
        </div>
        <div style={{opacity: '30%'}}>
          {children}
        </div>
      </div>
    )
  } else {
    return children
  }
}