import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleUploaded903Data } from './../api';
import Validator from "./Validator";
import Uploader from "./Uploader";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [pythonLoaded, setPythonLoaded] = useState(false);
  const [fileContents, setFileContents] = useState(new Map());
  const [parsedData, setParsedData] = useState(new Map());
  const [dataErrors, setDataErrors] = useState(new Map());
  const [errorDefinitions, setErrorDefinitions] = useState(new Map());

  useEffect(() => {
    (async () => {
      if (!window.pyodide.runPython) {
        await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/" });
        await window.pyodide.loadPackage('pandas')
        console.log('Loaded pyodide.');
      } else {
        console.log('Pyodide already loaded.')
      }

      setPythonLoaded(true);

    })();
  }, [])

  const addFileContent = useCallback((fileId, fileContent) => {
    let newFileContents = new Map(fileContents.set(fileId, fileContent));
    setFileContents(newFileContents);
  }, [fileContents])

  const runValidation = useCallback(async () => {
    let { data, errors, errorDefinitions } = await handleUploaded903Data(fileContents);
    setParsedData(data);
    setDataErrors(errors);
    setErrorDefinitions(errorDefinitions);
    setReady(true);
  }, [fileContents])

  const clearAndUpload = useCallback(() => {
    setReady(false);
    setParsedData(new Map());
    setDataErrors(new Map());
    setErrorDefinitions(new Map());
    setFileContents(new Map());
  }, [])

  return (
    <>
    {ready
      ? <Validator parsedData={parsedData} dataErrors={dataErrors} errorDefinitions={errorDefinitions} />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} />
    }
    <GovUK.LoadingBox loading={(!pythonLoaded) as boolean}>
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
    </GovUK.LoadingBox>
    </>
  )
}
