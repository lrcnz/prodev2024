import { Info } from 'lucide-react';
import Image from 'next/image';
import { useMemo, type MouseEventHandler } from 'react';

import GrowthImg from '@/assets/earn/growth.png';
import SavingsImg from '@/assets/earn/savings.png';
import { cn } from '@/lib/utils';
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

export const EarnCard = ({
  selected,
  type,
  children,
  onClick,
  disabled,
}: {
  selected: boolean;
  type: 'savings' | 'growth';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  const item = useMemo(() => items[type], [type]);

  return (
    <div
      className={cn('rounded-lg relative p-3 flex gap-4 cursor-pointer', item.bg, {
        'outline-blue-500 outline': !disabled && selected,
      })}
      onClick={(e) => !disabled && onClick(e)}
    >
      {children}
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
