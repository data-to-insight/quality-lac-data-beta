import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleUploaded903Data, loadPyodide } from './../api';
import Validator from "./Validator";
import Uploader from "./Uploader";
import { UploadedFile, UploadedFilesCallback, ValidatedData } from '../types';

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


  return (
    <>
    {validatedData
      ? <Validator validatedData={validatedData} />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} uploadErrors={uploadErrors} />
    }
    <LoadingBox loading={(!pythonLoaded) as boolean}>
      <GovUK.GridRow>
        <GovUK.GridCol>
          <GovUK.GridRow>
            <GovUK.GridCol>
              {pythonLoaded
                ? <GovUK.Button onClick={runValidation}>Validate</GovUK.Button>
                : <GovUK.Button buttonColour='gray'>Python loading...</GovUK.Button>
              }
            </GovUK.GridCol>
            <GovUK.GridCol>
              <GovUK.Button onClick={clearAndUpload}>
                Clear Data and Reupload
              </GovUK.Button>
            </GovUK.GridCol>
          </GovUK.GridRow>
        </GovUK.GridCol>
        <GovUK.GridCol>
          <GovUK.BackLink as={Link} to="/">Go back</GovUK.BackLink>
        </GovUK.GridCol>
      </GovUK.GridRow>
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