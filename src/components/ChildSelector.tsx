import * as GovUK from 'govuk-react';
import { useState } from 'react';

interface ChildSelectorProps {
    childIds: Array<number>
}

export default function ChildSelector({ childIds }: ChildSelectorProps) {
  let [selected, setSelected] = useState<number | null>();

  let rows = [];
  for (const [i, childId] of childIds.entries()) {
    if (childId === selected) {
      rows.push(
        <GovUK.Table.Row key={i}>
          <GovUK.Table.Cell key={i} onClick={() => setSelected(null)}>{childId} - selected</GovUK.Table.Cell>
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
    <GovUK.Table>
      {rows}
    </GovUK.Table>
  )
}