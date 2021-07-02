import * as GovUK from 'govuk-react';
import { useCallback, useEffect, useState } from 'react';
import Uploader from "./Uploader";
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [pythonLoaded, setPythonLoaded] = useState(false)
  const [fileContents, setFileContents] = useState({});

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
    let tempFileContents = {...fileContents}
    tempFileContents[fileId] = fileContent;
    setFileContents(tempFileContents);
  }, [fileContents])


  return (
    <GovUK.LoadingBox title="Loading Python..." loading={!pythonLoaded}>
      {ready
        ? <Validator />
        : <Uploader key={fileContents} currentFiles={fileContents} addFileContent={addFileContent} />
      }
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
  )
}

function Validator() {
  let rows = [];
  let headers = [];
  for (let i = 0; i < 5; i++) {
    rows.push(`Row ${i}`)
    headers.push(`Header ${i}`)
  }

  return (
    <>
    <GovUK.GridRow>
      <GovUK.GridCol setWidth={'one-quarter'}>
        <GovUK.H4>Child ID</GovUK.H4>
        <ChildSelector childIds={[100, 200, 300]}/>
      </GovUK.GridCol>
      <GovUK.GridCol setWidth={'three-quarter'}>
        <GovUK.H4>Header</GovUK.H4>
        <DataTable headers={headers} rows={[rows]} />
        <GovUK.SectionBreak visible mb={9}/>
        <GovUK.H4>Episodes</GovUK.H4>
        <DataTable headers={headers} rows={[rows]} />
      </GovUK.GridCol>
    </GovUK.GridRow>
    </>
  )
}

function DataTable({ headers, rows }) {
  let header_elements = [];
  let all_rows = [];
  for (const [i, header] of headers.entries()) {
    header_elements.push(<GovUK.Table.CellHeader key={i}>{header}</GovUK.Table.CellHeader>);
  }

  for (const [i, row] of rows.entries()) {
    let row_elements = [];
    for (const [j, r] of row.entries()) {
      row_elements.push(<GovUK.Table.Cell key={j}>{r}</GovUK.Table.Cell>);
    }
    all_rows.push(<GovUK.Table.Row key={i}>{row_elements}</GovUK.Table.Row>);
  }

  return (
    <GovUK.Table style={{ fontSize: '1em'}}>
        <GovUK.Table.Row>
          {header_elements}
        </GovUK.Table.Row>
        {all_rows}
    </GovUK.Table>
  )

}

function ChildSelector({ onSelectionChange, childIds }) {
  let [selected, setSelected] = useState();

  let rows = [];
  for (const [i, childId] of childIds.entries()) {
    if (childId === selected) {
      rows.push(
        <GovUK.Table.Row key={i}>
          <GovUK.Table.Cell key={i} onClick={() => setSelected()}>{childId} - selected</GovUK.Table.Cell>
        </GovUK.Table.Row>
      );
    } else {
      rows.push(
        <GovUK.Table.Row key={i}>
          <GovUK.Table.Cell key={i} onClick={() => setSelected(childId)}>{childId}</GovUK.Table.Cell>
        </GovUK.Table.Row>
      );
    }
  }

  return (
    <GovUK.Table>
      {rows}
    </GovUK.Table>
  )
}