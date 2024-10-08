import { useAtomValue, useSetAtom } from 'jotai';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

import GrowthImg from '@/assets/earn/growth.png';
import SavingsImg from '@/assets/earn/savings.png';
import { cn } from '@/lib/utils';
import { planAtom, switchPlanModalOpenedAtom } from '@/state/plan';
import { Badge } from '@/ui-components/Badge';
import { Popover } from '@/ui-components/Popover';

const items = {
  savings: {
    title: 'Savings',
    img: SavingsImg,
    bg: 'bg-[#E4F2F1]',
    apr: '5.13%',
    tootlip: 'Withdrawal T+1',
  },
  growth: {
    title: 'Growth',
    img: GrowthImg,
    bg: 'bg-[#F7F9C6]',
    apr: '7.73%',
    tootlip: 'Withdrawal T+1',
  },
};

export const EarnCard = ({ type }: { type: 'savings' | 'growth' }) => {
  const item = useMemo(() => items[type], [type]);
  const openModal = useSetAtom(switchPlanModalOpenedAtom);
  const plan = useAtomValue(planAtom);
  const selected = plan === type;

  return (
    <div
      className={cn('rounded-lg relative p-3 flex gap-4 cursor-pointer', item.bg, {
        'outline-blue-500 outline': selected,
      })}
      onClick={() => !selected && openModal(true)}
    >
      {selected && (
        <Badge variant="secondary" className="absolute top-2 right-2">
          Selected
        </Badge>
      )}
      <div>
        <Image className="h-20 w-20" src={item.img} alt={item.title} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-base">{item.title}</div>
        <div className="font-semibold text-lg">{item.apr} APY</div>
        <div className="text-sm text-muted-foreground flex gap-1.5 items-center">
          Withdrawal T+1
          <Popover
            style={{
              transform: 'translateY(5px)',
              '--arrow-size': '5px',
            }}
            placement="bottom"
            mode="dark"
            content={item.tootlip}
            trigger="click"
          >
            <div className="cursor-pointer">
              <Info size="16" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};
