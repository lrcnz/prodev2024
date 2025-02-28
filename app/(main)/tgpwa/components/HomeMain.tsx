'use client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { atom, useAtom } from 'jotai';
import Image from 'next/image';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import GrowthIcon from '../assets/icons/growth.png';
import InsuranceIcon from '../assets/icons/insurance.png';
import MicroLendingIcon from '../assets/icons/micro-lending.png';
import RemittenceIcon from '../assets/icons/remittence.png';
import SavingsIcon from '../assets/icons/savings.png';
import TermIcon from '../assets/icons/term.png';

import { useStartParam } from '../hooks';

import { RaffleModal } from './RaffleModal';

import { cn } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';

const Card = ({
  icon,
  title,
  describe,
  apr,
  className,
  onClick,
}: {
  className?: string;
  icon?: any;
  title: React.ReactNode;
  describe: React.ReactNode;
  apr: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn('text-[#111111] justify-between p-3 bg-white rounded-xl items-center gap-4 inline-flex', className)}
    >
      <div className="h-12  items-center gap-2 flex">
        <div className="rounded-[48px] justify-center items-center ">
          <Image src={icon} className="w-12 h-12 relative" alt="icon" />
        </div>
        <div className="flex-col gap-0.5 flex flex-1">
          <div className="text-base">{title}</div>
          <div className="text-[#92918e] text-xs">{describe}</div>
        </div>
      </div>
      <div className="px-2.5 py-1 bg-[#111111]/10 rounded-2xl justify-center items-center flex">
        <div className="text-center text-xs whitespace-nowrap">{apr}</div>
      </div>
    </div>
  );
};

const skipAtom = atom(false);

export const HomeMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [skip, setSkip] = useAtom(skipAtom);
  const { startapp, amount, loading } = useStartParam();
  const showRaffle = searchParams.get('rafflesuccess');
  const [openedModal, setOpenedModal] = useAtom(openedModalAtom);

  useEffect(() => {
    if (startapp && !skip) {
      setSkip(true);
      router.push(`/tgpwa/welcome`);
    }
  }, [router, setSkip, skip, startapp]);

  useEffect(() => {
    if (showRaffle) {
      setOpenedModal('raffle');
    }
  }, [showRaffle]);

  if (!loading) {
    return null;
  }

  return (
    <>
      <RaffleModal />
      <div className="bg-[#F7F6F1] text-[#111111] px-4 flex flex-col mb-24">
        <div className="flex items-center justify-between mt-5">
          <div className="text-[20px] font-bold">Featured Products</div>
          <div className="text-right text-[#007aff] text-base">See All</div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Card
            onClick={() => router.push('/tgpwa/savings')}
            icon={SavingsIcon}
            title="Super Savings"
            describe="build savings overtime, withdraw anytime, low min. deposits"
            apr="5.60% p.a."
          />
          <Card
            onClick={() => router.push('/tgpwa/growth')}
            icon={GrowthIcon}
            title="Super Growth"
            describe="grow savings with premium and passive income, withdraw anytime"
            apr="13.2% p.a."
          />
          <Card
            onClick={() => router.push('/tgpwa')}
            icon={TermIcon}
            title="Term Deposit"
            describe="locked in interest rate, 1 year fixed term"
            apr="23% p.a."
          />
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="text-[20px] font-bold">Coming Soon</div>
          <div className="text-right text-[#007aff] text-base">See All</div>
        </div>
        <div className="grid grid-cols-3 gap-3 my-3 mb-32">
          {[
            {
              title: 'Remittence',
              icon: RemittenceIcon,
            },
            {
              title: 'Insurance',
              icon: InsuranceIcon,
            },
            {
              title: 'Micro Lending',
              icon: MicroLendingIcon,
            },
          ].map(({ title, icon }, i) => (
            <div key={i} className="py-2 bg-white rounded-xl flex-col justify-center items-center gap-1 flex">
              <div className="justify-center items-center inline-flex">
                <Image src={icon} alt={title} className="w-10 h-10 relative" />
              </div>
              <div className="text-center text-[#333333] text-sm">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
