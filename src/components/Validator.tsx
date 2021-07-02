import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';

export default function Validator() {
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