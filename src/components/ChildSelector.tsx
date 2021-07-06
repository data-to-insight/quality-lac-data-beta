import * as GovUK from 'govuk-react';

interface ChildSelectorProps {
    childIds: Array<[number, number]>,
    selected: number | null,
    setSelected: (arg: number | null) => void,
}

export default function ChildSelector({ childIds, selected, setSelected }: ChildSelectorProps) {

  let rows = [];
  for (const [i, [childId, numErrors]] of childIds.entries()) {
    let selectionTarget: number | null = childId;
    let cellStyle = null;
    
    if (childId === selected) {
      selectionTarget = null;
      cellStyle = {backgroundColor: '#ccc'}
    }

    rows.push(
      <GovUK.Table.Row key={i}>
        <GovUK.Table.Cell key={i} onClick={() => setSelected(selectionTarget)} style={cellStyle}>
          <div style={{float: 'left', paddingLeft: '10px'}}>{childId}</div>
          <div style={{float: 'right', fontSize: '0.8em', paddingRight: '10px'}}>{numErrors > 0 ? `${numErrors} errors` : 'OK'}</div>
        </GovUK.Table.Cell>
      </GovUK.Table.Row>
    );
  }

  return (
    <div style={{'overflowY': 'scroll', 'maxHeight': '60vh'}}>
      <GovUK.Table style={{fontSize: '1em'}}>
        {rows}
      </GovUK.Table>
    </div>
  )
}