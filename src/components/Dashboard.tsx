import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleUploaded903Data } from './../api';
import Validator from "./Validator";
import Uploader from "./Uploader";
import { UploadedFile, UploadedFilesCallback, ValidatedData } from '../types';

export default function Dashboard() {
  const [pythonLoaded, setPythonLoaded] = useState(false);
  const [fileContents, setFileContents] = useState<Array<UploadedFile>>([]);
  const [validatedData, setValidatedData] = useState<ValidatedData | null>();

  useEffect(() => {
    (async () => {
      if (!window.pyodide.runPython) {
        await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/" });
        await window.pyodide.loadPackage('pandas');
        console.log('Loaded pyodide.');
      } else {
        console.log('Pyodide already loaded.');
      }

      setPythonLoaded(true);
    })();
  }, [])

  const addFileContent = useCallback<UploadedFilesCallback>(uploadedFile => {
    fileContents.push(uploadedFile); // We have to push to the old state in case the callback isn't updated in children
    setFileContents([...fileContents]);
  }, [fileContents])

  const runValidation = useCallback(async () => {
    setPythonLoaded(false);
    let newValidatedData = await handleUploaded903Data(fileContents);
    setValidatedData(newValidatedData);
    setPythonLoaded(true);
  }, [fileContents])

  const clearAndUpload = useCallback(() => {
    setValidatedData(null);
    setFileContents([]);
  }, [])

  return (
    <>
    {validatedData
      ? <Validator validatedData={validatedData} />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} />
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