import * as GovUK from 'govuk-react';
import { useState } from 'react';
import Uploader from "./Uploader";

export default function Dashboard() {
  const [uploaded, setUploaded] = useState(false);

  if (!uploaded) {
    return <Uploader setUploaded={setUploaded} />
  } else {
    return <Validator />
  }
}


function Validator() {
  let rows = [];
  let headers = [];
  for (let i = 0; i < 30; i++) {
    rows.push(`Row ${i}`)
    headers.push(`Header ${i}`)
  }

  return (
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
  )
}

function DataTable({ headers, rows }) {
  let header_elements = [];
  let all_rows = [];
  for (let header of headers) {
    header_elements.push(<GovUK.Table.CellHeader>{header}</GovUK.Table.CellHeader>);
  }

  for (let row of rows) {
    let row_elements = [];
    for (let r of row) {
      row_elements.push(<GovUK.Table.Cell>{r}</GovUK.Table.Cell>);
    }
    all_rows.push(<GovUK.Table.Row>{row_elements}</GovUK.Table.Row>);
  }

  return (
    <div style={{'overflow': 'scroll', 'width': '100%' }}>
      <GovUK.Table>
        <GovUK.Table.Row>
          {header_elements}
        </GovUK.Table.Row>
        {all_rows}
      </GovUK.Table>  
    </div>
  )

}

function ChildSelector({ onSelectionChange, childIds }) {
  let [selected, setSelected] = useState();

  let rows = [];
  for (let childId of childIds) {
    if (childId === selected) {
      rows.push(
        <GovUK.Table.Row>
          <GovUK.Table.Cell onClick={() => setSelected()}>{childId} - selected</GovUK.Table.Cell>
        </GovUK.Table.Row>
      );
    } else {
      rows.push(
        <GovUK.Table.Row>
          <GovUK.Table.Cell onClick={() => setSelected(childId)}>{childId}</GovUK.Table.Cell>
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