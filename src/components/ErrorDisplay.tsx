import * as GovUK from 'govuk-react';
import { DebounceInput } from 'react-debounce-input';
import { useMemo, ReactElement } from 'react';
import { ValidatedData } from './../types';
import styled from 'styled-components';

interface ErrorDisplayProps {
  validatedData: ValidatedData,
  isShown: boolean,
}

// The margin-bottom has to equal height + margin-top + border (top/bottom) + padding (top/bottom)
const ErrorStyles = styled.div`
.floatingContainer {
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

input {
  height: 13px;
  width: 180px;
}

table {
  font-size: 10px;
  overflow-y: auto;
}
`

export default function ErrorDisplay({ validatedData, isShown }: ErrorDisplayProps): ReactElement {
  let errorRows = useMemo<Array<ReactElement>>(() => {
    let errorCounts = new Map();
    validatedData.errors.forEach(locationToError => {
      locationToError.forEach(errorCodes => {
        errorCodes.forEach(errorCode => {
          errorCounts.set(errorCode, errorCounts.get(errorCode) ? errorCounts.get(errorCode) + 1 : 1)
        })
      })
    });

    let errorRows: Array<ReactElement> = [];
    errorCounts.forEach((count, errorCode) => {
      let errorDetails = validatedData.errorDefinitions.get(errorCode);
      
      errorRows.push(
        <GovUK.Table.Row key={errorCode}>
          <GovUK.Table.Cell>{errorCode}</GovUK.Table.Cell>
          <GovUK.Table.Cell>{errorDetails?.get('description')}</GovUK.Table.Cell>
          <GovUK.Table.Cell>{count}</GovUK.Table.Cell>
        </GovUK.Table.Row>
      )
    })

    return errorRows
  }, [validatedData])

  // TODO: Debounced input
  return (
    <ErrorStyles>
      <div className='floatingContainer' style={{display: isShown ? 'block' : 'none'}}>
        <DebounceInput minLength={2} debounceTimeout={300} onChange={event => console.log(event)} placeholder="Enter a child ID to filter..." />
        <button style={{float: 'right'}}>Clear filters</button>
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