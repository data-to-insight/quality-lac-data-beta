import * as GovUK from 'govuk-react';

interface ChildSelectorProps {
    childIds: Array<[number, number]>,
    selected: number | null,
    setSelected: (arg: number | null) => void,
}

export default function ChildSelector({ childIds, selected, setSelected }: ChildSelectorProps) {

  let rows = [];
  for (const [i, [childId, num_errors]] of childIds.entries()) {
    let selectionTarget: number | null = childId;
    let cellStyle = null;
    
    if (childId === selected) {
      selectionTarget = null;
      cellStyle = {backgroundColor: '#ccc'}
    }

    rows.push(
      <GovUK.Table.Row key={i}>
        <GovUK.Table.Cell key={i} onClick={() => setSelected(selectionTarget)} style={cellStyle}>{childId} ({num_errors})</GovUK.Table.Cell>
      </GovUK.Table.Row>
    );
  }

  return (
    <div style={{'overflowY': 'scroll', 'height': '60vh'}}>
      <GovUK.Table style={{fontSize: '1em'}}>
        {rows}
      </GovUK.Table>
    </div>
  )
}