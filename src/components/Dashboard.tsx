import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { handleUploaded903Data, loadPyodide } from './../api';
import Validator from "./Validator";
import Uploader from "./Uploader";
import { UploadedFile, UploadedFilesCallback, ValidatedData } from '../types';
import { childColumnName } from '../config';

export default function Dashboard() {
  const [pythonLoaded, setPythonLoaded] = useState(false);
  const [fileContents, setFileContents] = useState<Array<UploadedFile>>([]);
  const [uploadErrors, setUploadErrors] = useState<Array<any>>([]);
  const [validatedData, setValidatedData] = useState<ValidatedData | null>();

  useEffect(() => {
    (async () => {
      await loadPyodide();
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
    let [newValidatedData, pythonErrors] = await handleUploaded903Data(fileContents);
    if (pythonErrors.length === 0) {
      setValidatedData(newValidatedData);
    } else {
      clearAndUpload();
      setUploadErrors(pythonErrors)
    }
    setPythonLoaded(true);
  }, [fileContents, clearAndUpload])

  const downloadChildErrorCSV = useCallback(() => {
    let rows = [["ChildID", "ErrorCode", "ErrorDescription", "ErrorFields"]];
    validatedData?.data.forEach((table, tableName) => {
      let errors = validatedData.errors.get(tableName);
      table.forEach(dataRow => {
        let index = dataRow.get('Index') as number;
        let child = dataRow.get(childColumnName) as string;
        let errorList = errors?.get(index);
        errorList?.forEach(errorCode => {
          let errorDefn = validatedData.errorDefinitions.get(errorCode) as Map<string, any>;
          let errorFields = errorDefn?.get('affected_fields')?.toString();
          rows.push([child, errorCode, errorDefn?.get("description") as string, errorFields as string]);
        })
      })
    })

    let csvContent = new Blob([rows.map(e => e.join(",")).join('\n')], {type: 'text/csv'});
    saveAs(csvContent, 'ChildErrorSummary.csv')

  }, [validatedData])


  return (
    <>
    {validatedData
      ? <Validator validatedData={validatedData} />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} uploadErrors={uploadErrors} />
    }
    <LoadingBox loading={(!pythonLoaded) as boolean}>
      <div style={{marginRight: '10%', display: 'inline'}}>
        {pythonLoaded
          ? <GovUK.Button onClick={runValidation}>Validate</GovUK.Button>
          : <GovUK.Button buttonColour='gray'>Python loading...</GovUK.Button>
        }
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        <GovUK.Button onClick={clearAndUpload}>Clear Data and Reupload</GovUK.Button>
      </div>
      <div style={{marginRight: '10%', display: 'inline'}}>
        {validatedData
          ? <GovUK.Button onClick={downloadChildErrorCSV}>Download CSVs</GovUK.Button>
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
      <GovUK.LoadingBox loading>
        {children}
      </GovUK.LoadingBox>
    )
  } else {
    return children
  }
}