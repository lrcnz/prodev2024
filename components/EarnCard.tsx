import { Info } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

import FlexibleImg from '@/assets/earn/flexible.png';
import GrowthImg from '@/assets/earn/growth.png';
import SavingsImg from '@/assets/earn/savings.png';
import { cn } from '@/lib/utils';
import { Popover } from '@/ui-components/Popover';

const items = {
  savings: {
    title: 'Savings',
    img: SavingsImg,
    bg: 'bg-[#E4F2F1]',
  },
  growth: {
    title: 'Growth',
    img: GrowthImg,
    bg: 'bg-[#F7F9C6]',
  },
  flexible: {
    title: 'Flexible',
    img: FlexibleImg,
    bg: 'bg-[#E4E8FC]',
  },
};

export const EarnCard = ({ type }: { type: 'savings' | 'growth' | 'flexible' }) => {
  const item = useMemo(() => items[type], [type]);

  return (
    <div className={cn('rounded-lg p-3 flex gap-4', item.bg)}>
      <div>
        <Image className="h-20 w-20" src={item.img} alt={item.title} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-base">{item.title}</div>
        <div className="font-semibold text-lg">5.13% APY</div>
        <div className="text-sm text-muted-foreground flex gap-1.5 items-center">
          Withdrawal T+1
          <Popover
            style={{
              transform: 'translateY(5px)',
              '--arrow-size': '5px',
            }}
            placement="bottom"
            mode="dark"
            content="Hello"
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
