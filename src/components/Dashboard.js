import * as GovUK from 'govuk-react';
import { useCallback, useState } from 'react';
import Uploader from "./Uploader";

export default function Dashboard() {
  const [ready, setReady] = useState(false);
  const [fileContents, setFileContents] = useState({});

  const addFileContent = useCallback((fileId, fileContent) => {
    fileContents[fileId] = fileContent;
    setFileContents(fileContents);
  }, [fileContents])

  if (!ready) {
    return <Uploader setReady={setReady} addFileContent={addFileContent} />
  } else {
    return <Validator setReady={setReady} />
  }
}

function Validator({ setReady }) {
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
    <GovUK.BackLink onClick={() => setReady(false)}>Back</GovUK.BackLink>
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