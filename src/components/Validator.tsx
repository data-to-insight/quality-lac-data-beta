import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';
import { useState, useMemo } from 'react';
import { DataRow, ParsedData, ErrorIncidences, ErrorDefinitions } from './../types';

interface ValidatorProps {
  parsedData: Map<string, Array<DataRow>>,
  dataErrors: ErrorIncidences,
  errorDefinitions: ErrorDefinitions,
}

export default function Validator({ parsedData, dataErrors, errorDefinitions }: ValidatorProps) {
  let [selectedChild, setSelectedChild] = useState<number | null>(null);

  const headerData = useMemo(() => {
    return filterDataToChildId(parsedData, selectedChild, 'Header');
  }, [parsedData, selectedChild])

  const episodesData = useMemo(() => {
    let filteredData: ParsedData = new Map();
    Array.from(parsedData.keys()).forEach(key => {
      filteredData.set(key, filterDataToChildId(parsedData, selectedChild, key))
    })
    return filteredData;
  }, [parsedData, selectedChild])

  const childIdsWithErrors = useMemo<Array<[number, number]>>(() => {
    let uniqueIds: Set<number> = new Set();
    let childIds: Array<[number, number]> = [];
    parsedData.get('Header')?.forEach(childData => {
      const childId = childData.get('CHILD');
      if (!uniqueIds.has(childId)) {
        uniqueIds.add(childId);
        let num_errors = countErrorsForChild(parsedData, dataErrors, childId);
        childIds.push([childId, num_errors]);
      }
    });
    return childIds;
  }, [parsedData, dataErrors])

  return (
    <>
    <GovUK.GridRow>
      <GovUK.GridCol setWidth={'one-quarter'}>
        <GovUK.H4>Child ID</GovUK.H4>
        <ChildSelector childIds={childIdsWithErrors} selected={selectedChild} setSelected={setSelectedChild} />
      </GovUK.GridCol>
      <GovUK.GridCol setWidth='75%'>
        {selectedChild
        ? (
            <>
            <GovUK.H4>Header</GovUK.H4>
            <DataTable rowData={headerData} />
            <GovUK.SectionBreak mb={9}/>
            <GovUK.H4>Episodes</GovUK.H4>
            <DataTable rowData={episodesData.get('Episodes')} />
            </>
          )
        : <GovUK.H4>Select a child...</GovUK.H4>
        }
      </GovUK.GridCol>
    </GovUK.GridRow>
    </>
  )
}

function filterDataToChildId(parsedData: ParsedData, selectedChild: number | null, wantedTable: string) {
  let rowData: Array<DataRow> = [];

  parsedData.get(wantedTable)?.forEach(childData => {
      let child_id = childData.get('CHILD');
      if (child_id === selectedChild) {
        rowData.push(childData);
      }
  });
  return rowData;
}

function countErrorsForChild(parsedData: ParsedData, dataErrors: ErrorIncidences, childId: number): number {
  let count = 0;

  parsedData.forEach((data, fileName) => {
    data.forEach(row => {
      if (row.get('CHILD') === childId) {
        let index = row.get('Index');
        let has_error = dataErrors.get(fileName)?.get(index)
        if (has_error) {
          count += has_error.length;
        }
      }
    })
  })

  return count;
}
