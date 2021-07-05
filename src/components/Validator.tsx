import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';
import React, { useState, useMemo, ReactElement } from 'react';
import { DataRow, ParsedData, ErrorIncidences, ErrorDefinitions } from './../types';

interface ValidatorProps {
  parsedData: Map<string, Array<DataRow>>,
  dataErrors: ErrorIncidences,
  errorDefinitions: ErrorDefinitions,
}

export default function Validator({ parsedData, dataErrors, errorDefinitions }: ValidatorProps) {
  let [selectedChild, setSelectedChild] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    let filteredData: ParsedData = new Map();
    Array.from(parsedData.keys()).forEach(key => {
      filteredData.set(key, filterDataToChildId(parsedData, selectedChild, key))
    })
    return filteredData;
  }, [parsedData, selectedChild])

  const errorLocations = useMemo(() => {
    const errorLocations = new Map();
    dataErrors.forEach((errorLocation, fileName) => {
      let errors = new Set();
      errorLocation.forEach((errorCodes, index) => {
        errorCodes.forEach(errorCode => {
          errorDefinitions.get(errorCode)?.get('affected_fields').forEach((field: string) => {
            errors.add(JSON.stringify([index, field]));
          });
        });
      });
      errorLocations.set(fileName, errors);
    })

    return errorLocations;
  }, [dataErrors, errorDefinitions])

  const childIdsWithErrors = useMemo<Array<[number, number]>>(() => {
    let uniqueIds: Set<number> = new Set();
    let childIds: Array<[number, number]> = [];
    parsedData.get('Header')?.forEach(childData => {
      const childId = childData.get('CHILD');
      if (!uniqueIds.has(childId)) {
        uniqueIds.add(childId);
        let num_errors = getErrorsForChild(parsedData, dataErrors, childId).length;
        childIds.push([childId, num_errors]);
      }
    });
    return childIds;
  }, [parsedData, dataErrors])


  const childErrors = useMemo<Array<ReactElement>>(() => {
    let errors = getErrorsForChild(parsedData, dataErrors, selectedChild);
    const errorToString = ((errorCode: string) => {
      let error = errorDefinitions.get(errorCode);
      return `Error ${error?.get('code')} - ${error?.get('description')}`
    });

    return errors.map(e => <GovUK.ListItem>{errorToString(e)}</GovUK.ListItem>);
  }, [parsedData, dataErrors, errorDefinitions, selectedChild])

  return (
    <>
    <GovUK.GridRow mb={5}>
      <GovUK.GridCol setWidth={'one-quarter'}>
        <GovUK.H4>Child ID</GovUK.H4>
        <ChildSelector childIds={childIdsWithErrors} selected={selectedChild} setSelected={setSelectedChild} />
      </GovUK.GridCol>
      <GovUK.GridCol setWidth='75%'>
        {selectedChild
        ? (
            <>
            <GovUK.H4>Header</GovUK.H4>
            <DataTable rowData={filteredData.get('Header')} highlight={errorLocations.get('Header')} />
            <GovUK.SectionBreak mb={9}/>
            <GovUK.H4>Episodes</GovUK.H4>
            <DataTable rowData={filteredData.get('Episodes')} highlight={errorLocations.get('Episodes')} />
            {childErrors.length > 0
              ? (
                <>
                <GovUK.H4>Errors</GovUK.H4>
                <GovUK.UnorderedList>
                  {childErrors}
                </GovUK.UnorderedList>
                </>
                )
              : <></>
            }
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

function getErrorsForChild(parsedData: ParsedData, dataErrors: ErrorIncidences, childId: number | null): Array<string> {
  if (!childId) { return []; }

  let allErrors: Array<string> = [];

  parsedData.forEach((data, fileName) => {
    data.forEach(row => {
      if (row.get('CHILD') === childId) {
        let index = row.get('Index');
        let errors = dataErrors.get(fileName)?.get(index);
        if (errors) {errors.forEach(e => allErrors.push(e))}
      }
    })
  })

  return allErrors;
}
