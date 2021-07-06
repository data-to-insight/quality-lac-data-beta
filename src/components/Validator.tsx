import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import DataTable from './DataTable';
import { useState, useMemo, ReactElement } from 'react';
import { DataRow, ParsedData, ValidatedData } from './../types';

interface ValidatorProps {
  validatedData: ValidatedData
}

export default function Validator({ validatedData }: ValidatorProps) {
  let [selectedChild, setSelectedChild] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    let filteredData: ParsedData = new Map();
    validatedData.data.forEach((_, key) => {
      filteredData.set(key, filterDataToChildId(validatedData.data, selectedChild, key))
    })
    return filteredData;
  }, [validatedData, selectedChild])

  const errorLocations = useMemo(() => {
    const errorLocations = new Map();
    validatedData.errors.forEach((errorLocation, fileName) => {
      let errors = new Set();
      errorLocation.forEach((errorCodes, index) => {
        errorCodes.forEach(errorCode => {
          let affectedFields = validatedData.errorDefinitions.get(errorCode)?.get('affected_fields') as Array<String>
          affectedFields.forEach(field => {
            errors.add(JSON.stringify([index, field]));
          });
        });
      });
      errorLocations.set(fileName, errors);
    })

    return errorLocations;
  }, [validatedData])

  const childIdsWithErrors = useMemo<Array<[number, number]>>(() => {
    let uniqueIds: Set<number> = new Set();
    let childIds: Array<[number, number]> = [];
    validatedData.data.get('Header')?.forEach(childData => {
      const childId = childData.get('CHILD') as number;
      if (!uniqueIds.has(childId)) {
        uniqueIds.add(childId);
        let num_errors = getErrorsForChild(validatedData, childId).length;
        childIds.push([childId, num_errors]);
      }
    });
    return childIds;
  }, [validatedData])


  const childErrors = useMemo<Array<ReactElement>>(() => {
    let errors = getErrorsForChild(validatedData, selectedChild);
    const errorToString = ((errorCode: string) => {
      let error = validatedData.errorDefinitions.get(errorCode);
      return `Error ${error?.get('code')} - ${error?.get('description')}`
    });

    return errors.map(e => <GovUK.ListItem style={{fontSize: '1em'}}>{errorToString(e)}</GovUK.ListItem>);
  }, [validatedData, selectedChild])

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
                <GovUK.UnorderedList style={{fontSize: '1em'}}>
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

function getErrorsForChild({data: parsedData, errors: dataErrors}: ValidatedData, childId: number | null): Array<string> {
  if (!childId) { return []; }

  let allErrors: Array<string> = [];

  parsedData.forEach((data, fileName) => {
    data.forEach(row => {
      if (row.get('CHILD') === childId) {
        let index = row.get('Index') as number;
        let errors = dataErrors.get(fileName)?.get(index);
        if (errors) {errors.forEach(e => allErrors.push(e))}
      }
    })
  })

  return allErrors;
}
