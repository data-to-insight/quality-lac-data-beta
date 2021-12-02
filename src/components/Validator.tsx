import * as GovUK from 'govuk-react';
import ChildSelector from './ChildSelector';
import { useState, useMemo, useEffect, useRef, ReactElement } from 'react';
import { headerTableName, childColumnName } from './../config';
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

  let errorDisplayRef = useRef(null);

  // Scroll to top when this renders
  useEffect(() => window.scrollTo(0, 0), [])


  // Close error display if click outside
  useEffect(() => {
    const handleClickOutside = async (event: any) => {
      if (errorDisplayRef.current && !(errorDisplayRef.current as any).contains(event.target)) {
        setErrorDisplayShown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }

  }, [errorDisplayRef])

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
  */
  const childIdsWithErrors = useMemo<Array<[string, Array<string>]>>(() => {
    let errorsByChildId = getErrorsByChildId(validatedData);
    return Array.from(errorsByChildId.entries());
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
          <button 
            onClick={event => {
              // Stop the click-outside event from also firing
              event.stopPropagation();
              setErrorDisplayShown(!errorDisplayShown);
            }} 
            style={{display: 'inline', backgroundColor: (childFilter || errorFilter) ? '#a7c2d1' : undefined}}
          >Filter</button>
        </div>
        {errorDisplayShown
          && <ErrorDisplay innerRef={errorDisplayRef} validatedData={validatedData} setChildFilter={setChildFilter} setErrorFilter={setErrorFilter} setShown={setErrorDisplayShown}/>
        }
        <ChildSelector childIds={filteredIdsWithErrorCounts} selected={selectedChild} setSelected={setSelectedChild} />
      </GovUK.GridCol>
      <GovUK.GridCol>
        {selectedChild
        ? (
            <>
            <div style={{width: '50%'}}>
              <GovUK.H4>Header</GovUK.H4>
              <DataTable rowData={filteredData.get(headerTableName)} highlight={errorLocations.get(headerTableName) as Set<string>} />
            </div>
            <GovUK.SectionBreak mb={9}/>
            <TabbedData tableData={filteredData} errorLocations={errorLocations} excludedTable={headerTableName} />
            {childErrors.length > 0
              ? (
                <>
                <GovUK.H4>Errors</ GovUK.H4>
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
      let child_id = childData.get(childColumnName);
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
      if (row.get(childColumnName) === childId) {
        let index = row.get('Index') as number;
        let errors = dataErrors.get(fileName)?.get(index);
        if (errors) {errors.forEach(e => allErrors.push(e))}
      }
    })
  })

  return allErrors;
}

function getErrorsByChildId({data: parsedData, errors: dataErrors}: ValidatedData): Map<string, Array<string>> {
  let allErrors: Map<string, Array<string>> = new Map();

  parsedData.forEach((data, fileName) => {
    data.forEach(row => {
      let childId = row.get(childColumnName) as string;
      if (!allErrors.has(childId)) {allErrors.set(childId, []);}
      let index = row.get('Index') as number;
      let errors = dataErrors.get(fileName)?.get(index);
      if (errors) {errors.forEach(e => allErrors.get(childId)?.push(e))}
    })
  })

  return allErrors;
}