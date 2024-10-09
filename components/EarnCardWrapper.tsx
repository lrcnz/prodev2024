import { useAtomValue, useSetAtom } from 'jotai';

import { EarnCard } from '@/components/EarnCard';
import { planAtom, switchPlanModalOpenedAtom } from '@/state/plan';
import { Badge } from '@/ui-components/Badge';

export const EarnCardWrapper = ({ type }: { type: 'savings' | 'growth' }) => {
  const openModal = useSetAtom(switchPlanModalOpenedAtom);
  const plan = useAtomValue(planAtom);
  const selected = plan === type;

  return (
    <EarnCard type={type} selected={selected} onClick={() => !selected && openModal(true)}>
      {selected ? (
        <Badge variant="outline" className="absolute top-2 right-2">
          Selected
        </Badge>
      ) : null}
    </EarnCard>
  );
};
