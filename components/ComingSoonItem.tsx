import Image from 'next/image';
import { useMemo } from 'react';

import loanImg from '@/assets/comingsoon/loan.png';
import PaymentImg from '@/assets/comingsoon/payment.png';
import RemittenceImg from '@/assets/comingsoon/remittence.png';
import StakeImg from '@/assets/comingsoon/stake.png';

const items = {
  loan: {
    title: 'Loan',
    img: loanImg,
  },
  payment: {
    title: 'Payment',
    img: PaymentImg,
  },
  remittence: {
    title: 'Remittence',
    img: RemittenceImg,
  },
  stake: {
    title: 'Stake',
    img: StakeImg,
  },
};

export const ComingSoonItem = ({ variant }: { variant: 'loan' | 'payment' | 'remittence' | 'stake' }) => {
  const item = useMemo(() => items[variant], [variant]);
  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <div className="rounded-full bg-zinc-200 p-3">
          <Image alt={item.title} src={item.img} width={40} height={40} />
        </div>
      </div>
      <div className="mt-1 flex items-center justify-center text-sm text-accent-foreground">{item.title}</div>
    </div>
  );
};
