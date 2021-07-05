import * as GovUK from 'govuk-react';
import { ReactElement } from 'react';
import { DataRow } from '../types';

interface DataTableProps {
  rowData: Array<DataRow> | undefined,
}

export default function DataTable({ rowData }: DataTableProps): ReactElement {
  let header_elements = [];
  let all_rows = []

  if (rowData) {
    if (rowData.length > 0) {
      for (const [i, header] of Array.from(rowData[0].keys()).entries()) {
        header_elements.push(<GovUK.Table.CellHeader key={i}>{header}</GovUK.Table.CellHeader>);
      }
    }

    for (const [i, row] of rowData.entries()) {
      let row_elements = [];
      for (const [j, r] of Array.from(row.values()).entries()) {
        row_elements.push(<GovUK.Table.Cell key={j}>{r.toString()}</GovUK.Table.Cell>);
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
  } else {
    return <GovUK.H6>No data found for table.</GovUK.H6>
  }
}