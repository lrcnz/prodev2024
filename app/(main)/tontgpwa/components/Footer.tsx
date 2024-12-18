import Image from 'next/image';

import AccountIcon from '../assets/footer/account.svg';
import EarnActiveIcon from '../assets/footer/earn-active.svg';
import EarnInActiveIcon from '../assets/footer/earn-inactive.svg';
import SendIcon from '../assets/footer/send.svg';
import SpendIcon from '../assets/footer/spend.svg';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Footer = ({ active }: { active: 'account' | 'earn' | 'send' | 'spend' }) => {
  return (
    <div className="fixed bottom-0 bg-[#fff] w-full px-8 pt-2 pb-8">
      <div className="flex justify-between w-full">
        {[
          {
            title: 'Earn',
            key: 'earn',
            link: '/tontgpwa',
            activeIcon: EarnActiveIcon,
            inactiveIcon: EarnInActiveIcon,
          },
          {
            title: 'Send',
            key: 'send',
            link: '/tontgpwa',
            activeIcon: SendIcon,
            inactiveIcon: SendIcon,
          },
          {
            title: 'Spend',
            key: 'spend',
            link: '/tontgpwa',
            activeIcon: SpendIcon,
            inactiveIcon: SpendIcon,
          },
          {
            title: 'Account',
            key: 'account',
            link: '/tontgpwa/account',
            activeIcon: AccountIcon,
            inactiveIcon: AccountIcon,
          },
        ].map((item) => (
          <Link
            href={item.link}
            key={item.key}
            className={cn('pt-2 flex-col gap-1 flex justify-center items-center', {
              'text-[#200e32]/50': item.key !== active,
              'text-[#007aff]': item.key === active,
            })}
          >
            <div>{item.key === active ? <item.activeIcon /> : <item.inactiveIcon />}</div>
            <div className="text-center text-xs font-medium">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
