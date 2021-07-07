import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import { useState, useMemo, ReactElement } from 'react';
import DataTable from './DataTable';
import TabbedData from './TabbedData';
import ErrorDisplay from './ErrorDisplay';
import { DataRow, ParsedData, ValidatedData, ErrorLocations } from './../types';

interface ValidatorProps {
  validatedData: ValidatedData
}

export default function Validator({ validatedData }: ValidatorProps) {
  let [childFilter, setChildFilter] = useState<string | null>(null);
  let [errorFilter, setErrorFilter] = useState<string | null>(null);
  let [selectedChild, setSelectedChild] = useState<string | null>(null);
  let [errorDisplayShown, setErrorDisplayShown] = useState(false);

  /**
   * Filters the data that is shown to the selected child
   */
  const filteredData = useMemo(() => {
    let filteredData: ParsedData = new Map();
    validatedData.data.forEach((_, key) => {
      filteredData.set(key, filterDataToChildId(validatedData.data, selectedChild, key))
    })
    return filteredData;
  }, [validatedData, selectedChild])

  /**
   * Computes a set of error locations used for highlighting. These are coordinates (index, columnName).
   * The co-ordinates are then stringify-ed to allow hash comparison in a Set.
   */
  const errorLocations = useMemo<ErrorLocations>(() => {
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

  /**
   * Computes the list of errors for each child.
   * TODO: Current implementation is O(N * M) for N data, M child. Think can be O(N)
   */
  const childIdsWithErrors = useMemo<Array<[string, Array<string>]>>(() => {
    let uniqueIds: Set<string> = new Set();
    let childIds: Array<[string, Array<string>]> = [];
    validatedData.data.get('Header')?.forEach(childData => {
      const childId = childData.get('CHILD') as string;
      if (!uniqueIds.has(childId)) {
        uniqueIds.add(childId);
        let errors = getErrorsForChild(validatedData, childId);
        childIds.push([childId, errors]);
      }
    });
    return childIds;
  }, [validatedData])
  
  /**
   * The child ID errors then get filtered to include only filtered Child IDs, or filtered errors.
   * If a filter is not set it is assumed we should see everything.
   * We then compute counts to pass to ChildSelector
   */
  const filteredIdsWithErrorCounts = useMemo<Array<[string, number]>>(() => {
    let filteredIds: Array<[string, number]> = [];
    for (let [childId, errors] of childIdsWithErrors) {
      let numErrors = errors.filter(e => errorFilter ? e === errorFilter : true).length;
      let childMatches = childFilter ? childId.toString().includes(childFilter) : true;
      let errorMatches = errorFilter ? numErrors > 0 : true;

      if (childMatches && errorMatches) {
        filteredIds.push([childId, numErrors]);
      }
    }
    return filteredIds;
  }, [childIdsWithErrors, childFilter, errorFilter]);

  const childErrors = useMemo<Array<ReactElement>>(() => {
    let errors = getErrorsForChild(validatedData, selectedChild);
    const errorToString = ((errorCode: string) => {
      let error = validatedData.errorDefinitions.get(errorCode);
      return `Error ${error?.get('code')} - ${error?.get('description')}`
    });

    return Array.from(errors.entries()).map(([i, e]) => <GovUK.ListItem key={i} style={{fontSize: '1em'}}>{errorToString(e)}</GovUK.ListItem>);
  }, [validatedData, selectedChild])

  return (
    <>
    <GovUK.GridRow mb={5}>
      <GovUK.GridCol setWidth='200px'>
        <div>
          <GovUK.H4 mb={8} style={{'display': 'inline', 'marginRight': '10px'}}>Child ID</GovUK.H4>
          <button onClick={() => {setErrorDisplayShown(!errorDisplayShown)}} style={{display: 'inline', backgroundColor: (childFilter || errorFilter) ? '#a7c2d1' : undefined}}>Filter</button>
        </div>
        <ErrorDisplay validatedData={validatedData} isShown={errorDisplayShown} setChildFilter={setChildFilter} setErrorFilter={setErrorFilter} />
        <ChildSelector childIds={filteredIdsWithErrorCounts} selected={selectedChild} setSelected={setSelectedChild} />
      </GovUK.GridCol>
      <GovUK.GridCol>
        {selectedChild
        ? (
            <>
            <div style={{width: '50%'}}>
              <GovUK.H4>Header</GovUK.H4>
              <DataTable rowData={filteredData.get('Header')} highlight={errorLocations.get('Header') as Set<string>} />
            </div>
            <GovUK.SectionBreak mb={9}/>
            <TabbedData tableData={filteredData} errorLocations={errorLocations} excludedTable='Header' />
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
        : <GovUK.Caption>Select a child...</GovUK.Caption>
        }
      </GovUK.GridCol>
    </GovUK.GridRow>
    </>
  )
}

function filterDataToChildId(parsedData: ParsedData, selectedChild: string | null, wantedTable: string) {
  let rowData: Array<DataRow> = [];

  parsedData.get(wantedTable)?.forEach(childData => {
      let child_id = childData.get('CHILD');
      if (child_id === selectedChild) {
        rowData.push(childData);
      }
  });
  return rowData;
}

function getErrorsForChild({data: parsedData, errors: dataErrors}: ValidatedData, childId: string | null): Array<string> {
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
