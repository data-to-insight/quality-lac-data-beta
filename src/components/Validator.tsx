import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';
import { useState, useMemo } from 'react';
import { DataRow, ParsedData } from './../types';

interface ValidatorProps {
  parsedData: Map<string, Array<DataRow>>
}

export default function Validator({ parsedData }: ValidatorProps) {
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

  const childIds = useMemo<Set<number>>(() => {
    let uniqueIds: Set<number> = new Set();
    parsedData.get('Header')?.forEach(childData => {
        uniqueIds.add(childData.get('CHILD'));
    });
    return uniqueIds;
  }, [parsedData])

  return (
    <>
    <GovUK.GridRow>
      <GovUK.GridCol setWidth={'one-quarter'}>
        <GovUK.H4>Child ID</GovUK.H4>
        <ChildSelector childIds={Array.from(childIds)} selected={selectedChild} setSelected={setSelectedChild} />
      </GovUK.GridCol>
      <GovUK.GridCol>
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