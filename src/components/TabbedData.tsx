import * as GovUK from 'govuk-react';
import { ReactElement } from 'react';
import DataTable from './DataTable';
import { ParsedData, ErrorLocations } from './../types';

interface TabbedDataProps {
  tableData: ParsedData,
  errorLocations: ErrorLocations,
}

export default function TabbedData({ tableData, errorLocations }: TabbedDataProps): ReactElement {
  return (
    <>
    <GovUK.H4>Episodes</GovUK.H4>
    <DataTable rowData={tableData.get('Episodes')} highlight={errorLocations.get('Episodes') as Set<string>} />
    </>
  )
}