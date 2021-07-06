import styled from 'styled-components';
import * as GovUK from 'govuk-react';
import { ReactElement } from 'react';
import { DataRow } from '../types';

interface DataTableProps {
  rowData: Array<DataRow> | undefined,
  highlight: Set<string>,
}

const TableStyles = styled.div`
table {
  font-size: 14px;
}

td {
  padding: 5px;
}

.error {
  color: #D8000C;
  background-color: #FFD2D2;
}
`

export default function DataTable({ rowData, highlight }: DataTableProps): ReactElement {
  let header_elements = [];
  let all_rows = [];

  if (rowData && rowData.length > 0) {
    for (const [i, header] of Array.from(rowData[0].keys()).entries()) {
      header_elements.push(<GovUK.Table.CellHeader key={i}>{header}</GovUK.Table.CellHeader>);
    }

    for (const [i, row] of rowData.entries()) {
      let row_elements = [];
      for (const [j, [rowHeader, r]] of Array.from(row.entries()).entries()) {
        let highlighted = highlight.has(JSON.stringify([row.get("Index"), rowHeader]))
        row_elements.push(<GovUK.Table.Cell key={j} className={highlighted ? 'error' : null}>{Number.isNaN(r) ? 'N/A' : r.toString()}</GovUK.Table.Cell>);
      }
      all_rows.push(<GovUK.Table.Row key={i}>{row_elements}</GovUK.Table.Row>);
    }

    return (
      <TableStyles>
        <GovUK.Table>
            <GovUK.Table.Row>
              {header_elements}
            </GovUK.Table.Row>
            {all_rows}
        </GovUK.Table>
      </TableStyles>
    )
  } else {
    return <GovUK.Paragraph>No data found for table.</GovUK.Paragraph>
  }
}