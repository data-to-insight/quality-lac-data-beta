import * as GovUK from 'govuk-react';
import { DebounceInput } from 'react-debounce-input';
import { useMemo, useCallback, useState, useEffect, ReactElement } from 'react';
import { ValidatedData } from './../types';
import styled from 'styled-components';

interface ErrorDisplayProps {
  validatedData: ValidatedData,
  setChildFilter: (arg: string | null) => void;
  setErrorFilter: (arg: string | null) => void;
  setShown: (arg: boolean) => void;
  innerRef: React.RefObject<HTMLInputElement>
}

// The margin-bottom has to equal height + margin-top + border (top/bottom) + padding (top/bottom)
const ErrorStyles = styled.div`
.floatingContainer {
  display: block;
  position: relative;
  padding: 10px 10px;
  top: 0;
  left: 100px;
  width: 300px;
  height: 300px;
  margin-top: 5px;
  margin-bottom: -327px;
  border: 1px solid black;
  background-color: #fff;
  font-size: 10px;
}  

.floatingClose {
  cursor: pointer;
  float: right;
  position: relative;
  top: -23px;
  left: 10px;
}

input {
  height: 13px;
  width: 180px;
}

table {
  font-size: 10px;
  overflow-y: auto;
}

.selectedError {
  background-color: #ccc;
}
`

export default function ErrorDisplay({ validatedData, setChildFilter, setErrorFilter, setShown, innerRef }: ErrorDisplayProps): ReactElement {
  const [filterText, setFilterText] = useState('');
  const [selectedError, setSelectedError] = useState(null);

  const errorRows = useMemo<Array<ReactElement>>(() => {
    let errorCounts = new Map();
    validatedData.errors.forEach(locationToError => {
      locationToError.forEach(errorCodes => {
        errorCodes.forEach(errorCode => {
          errorCounts.set(errorCode, errorCounts.get(errorCode) ? errorCounts.get(errorCode) + 1 : 1)
        })
      })
    });

    let errorCountsArr = Array.from(errorCounts.entries());
    errorCountsArr.sort(([, firstCount], [, secondCount]) => secondCount - firstCount);
    return errorCountsArr.map(([errorCode, count]) => {
      let errorDetails = validatedData.errorDefinitions.get(errorCode);
      let isSelected = errorCode === selectedError
      
      return (
          <GovUK.Table.Row key={errorCode} className={isSelected ? 'selectedError' : null} onClick={() => setSelectedError(isSelected ? null : errorCode)}>
            <GovUK.Table.Cell>{errorCode}</GovUK.Table.Cell>
            <GovUK.Table.Cell>{errorDetails?.get('description')}</GovUK.Table.Cell>
            <GovUK.Table.Cell>{count}</GovUK.Table.Cell>
          </GovUK.Table.Row>
      )
    })
  }, [validatedData, selectedError]);

  useEffect(() => {
    setChildFilter(filterText);
  }, [filterText, setChildFilter])

  useEffect(() => {
    setErrorFilter(selectedError);
  }, [selectedError, setErrorFilter])

  const clearFilters = useCallback(() => {
    setFilterText('');
    setSelectedError(null);
  }, [setFilterText])

  return (
    <ErrorStyles>
      <div ref={innerRef} className='floatingContainer'>
        <DebounceInput minLength={2} debounceTimeout={150} onChange={event => setFilterText(event.target.value)} value={filterText} placeholder="Enter a child ID to filter..." />
        <span onClick={() => setShown(false)} className='floatingClose'>[x]</span>
        <button style={{float: 'right'}} onClick={clearFilters}>Clear filters</button>
        <p>Click each row to filter for only that error type.</p>
        <GovUK.Table>
          <GovUK.Table.Row>
            <GovUK.Table.CellHeader>Code</GovUK.Table.CellHeader>
            <GovUK.Table.CellHeader>Message</GovUK.Table.CellHeader>
            <GovUK.Table.CellHeader>Count</GovUK.Table.CellHeader>
          </GovUK.Table.Row>
          {errorRows}
        </GovUK.Table>
      </div>
    </ErrorStyles>
  )
}