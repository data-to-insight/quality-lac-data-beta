import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';

interface ValidatorProps {
    parsedData: Map<string, Array<Map<string, any>>>
}

export default function Validator({ parsedData }: ValidatorProps) {
  let rows = [];
  let headers = [];
  for (let i = 0; i < 5; i++) {
    rows.push(`Row ${i}`)
    headers.push(`Header ${i}`)
  }


  let childIds: Set<number> = new Set();
  parsedData.get('HEADER')?.forEach(childData => {
      childIds.add(childData.get('CHILD'));
  })

  return (
    <>
    <GovUK.GridRow>
      <GovUK.GridCol setWidth={'one-quarter'}>
        <GovUK.H4>Child ID</GovUK.H4>
        <ChildSelector childIds={Array.from(childIds)}/>
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