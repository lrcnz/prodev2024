import { useAtomValue, useSetAtom } from 'jotai';

import { EarnCard } from '@/components/EarnCard';
import { useCurrentWallet } from '@/hooks/useWallet';
import { planAtom, switchPlanModalOpenedAtom } from '@/state/plan';
import { Badge } from '@/ui-components/Badge';

export const EarnCardWrapper = ({ type }: { type: 'savings' | 'growth' }) => {
  const openModal = useSetAtom(switchPlanModalOpenedAtom);
  const plan = useAtomValue(planAtom);
  const selected = plan === type;
  const { data: wallet } = useCurrentWallet();
  const disabled = !wallet?.address;

  return (
    <EarnCard disabled={disabled} type={type} selected={selected} onClick={() => !selected && openModal(true)}>
      {!disabled && selected ? (
        <Badge variant="outline" className="absolute top-2 right-2">
          Selected
        </Badge>
      ) : null}
    </EarnCard>
  );
};
