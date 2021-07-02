import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Validator from "./Validator";
import Uploader from "./Uploader";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [fileContents, setFileContents] = useState(new Map());

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
    setFileContents(new Map(fileContents.set(fileId, fileContent)));
  }, [fileContents])


  return (
    <>
    {ready
      ? <Validator />
      : <Uploader currentFiles={fileContents} addFileContent={addFileContent} />
    }
    <GovUK.LoadingBox loading={!pythonLoaded}>
      <GovUK.GridRow>
        <GovUK.GridCol>
          <GovUK.GridRow>
            <GovUK.GridCol>
              {pythonLoaded
                ? <GovUK.Button onClick={() => setReady(true)}>Validate</GovUK.Button>
                : <GovUK.Button buttonColour='gray'>Python loading...</GovUK.Button>
              }
            </GovUK.GridCol>
            <GovUK.GridCol>
              <GovUK.Button onClick={() => setReady(false)}>
                Re-Upload
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
