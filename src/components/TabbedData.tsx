import * as GovUK from 'govuk-react';
import { useState, ReactElement } from 'react';
import DataTable from './DataTable';
import { ParsedData, ErrorLocations } from './../types';

interface TabbedDataProps {
  tableData: ParsedData,
  errorLocations: ErrorLocations,
}

export default function TabbedData({ tableData, errorLocations }: TabbedDataProps): ReactElement {
  const [tabIndex, setTabIndex] = useState(0);
  const shownTables = Array.from(tableData.keys()).filter(tableName => tableName !== 'Header')
  return (
    <GovUK.Tabs>
      <GovUK.Tabs.Title>Upload</GovUK.Tabs.Title>
      <GovUK.Tabs.List>
        <GovUK.Tabs.Tab onClick={() => setTabIndex(0)} selected={tabIndex === 0}>Episodes</GovUK.Tabs.Tab>
        <GovUK.Tabs.Tab onClick={() => setTabIndex(1)} selected={tabIndex === 1}>Episodes 2</GovUK.Tabs.Tab>
      </GovUK.Tabs.List>
      <GovUK.Tabs.Panel selected={tabIndex === 0}>
        <DataTable rowData={tableData.get('Episodes')} highlight={errorLocations.get('Episodes') as Set<string>} />
      </GovUK.Tabs.Panel>
      <GovUK.Tabs.Panel selected={tabIndex === 1}>
        <DataTable rowData={tableData.get('Episodes')} highlight={errorLocations.get('Episodes') as Set<string>} />
      </GovUK.Tabs.Panel>
    </GovUK.Tabs>
  )
}