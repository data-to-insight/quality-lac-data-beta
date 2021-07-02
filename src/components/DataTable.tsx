import * as GovUK from 'govuk-react';
import { ReactElement } from 'react';

interface DataTableProps {
  headers: Array<string>,
  rows: Array<Array<string>>,
}

export default function DataTable({ headers, rows }: DataTableProps): ReactElement {
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