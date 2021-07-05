import * as GovUK from 'govuk-react';

interface ChildSelectorProps {
    childIds: Array<number>,
    selected: number | null,
    setSelected: (arg: number | null) => void,
}

export default function ChildSelector({ childIds, selected, setSelected }: ChildSelectorProps) {

  let rows = [];
  for (const [i, childId] of childIds.entries()) {
    if (childId === selected) {
      rows.push(
        <GovUK.Table.Row key={i}>
          <GovUK.Table.Cell key={i} onClick={() => setSelected(null)} style={{backgroundColor: '#ccc'}}>{childId}</GovUK.Table.Cell>
        </GovUK.Table.Row>
      );
    } else {
      rows.push(
        <GovUK.Table.Row key={i}>
          <GovUK.Table.Cell key={i} onClick={() => setSelected(childId)}>{childId}</GovUK.Table.Cell>
        </GovUK.Table.Row>
      );
    }
  }

  return (
    <div style={{'overflowY': 'scroll', 'height': '60vh'}}>
      <GovUK.Table>
        {rows}
      </GovUK.Table>
    </div>
  )
}