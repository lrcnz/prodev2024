'use client';
import { useSetAtom } from 'jotai';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { type Viewport } from 'next';

import Link from 'next/link';

import ApyIcon from '../assets/icons/apy.svg';
import AumIcon from '../assets/icons/aum.svg';
import SaversIcon from '../assets/icons/savers.svg';

import { Chart } from './Chart';

import { cn } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';

export const viewport: Viewport = {
  themeColor: '#f7f6f1',
};

const Card = ({ title, value, icon, className }: { title: string; value: string; icon: any; className?: string }) => {
  const Component = icon;
  return (
    <div className={cn('bg-[#007aff]/10 rounded-[20px] flex-col items-center flex justify-center p-4', className)}>
      <div className="items-center gap-2 inline-flex">
        <div>
          <Component />
        </div>
        <div className="text-[#111111] text-sm font-medium">{title}</div>
      </div>
      <div className="text-[#111111] text-[40px] font-semibold mt-2">{value}</div>
    </div>
  );
};

const Page = () => {
  const setOpened = useSetAtom(openedModalAtom);

  return (
    <>
      <div className="bg-[#f7f6f1] flex flex-col h-full">
        <div className="h-11 flex-col flex">
          <div className="relative flex w-full justify-center items-center pt-2">
            <Link href="/tgpwa" className="absolute left-3">
              <ChevronLeft size={28} />
            </Link>
            <div className="text-center text-[#111111] text-lg font-semibold">Super Savings (SuperState)</div>
          </div>
        </div>
        <div className="px-4 mt-4">
          <div className="flex gap-3 justify-between">
            <Card className="flex-1" icon={ApyIcon} title="APY" value="5.6%" />
            <Card className="flex-1" icon={SaversIcon} title="SAVERS" value="12,510" />
          </div>
          <div className="mt-3">
            <Card icon={AumIcon} title="AUM" value="$53.68M" />
          </div>
        </div>
        <div className="px-4 mt-3 justify-between items-center flex">
          <div className=" text-[#007aff] text-base">Strategy Details</div>
          <div>
            <ChevronRight className="text-[#007aff] translate-y-[0.5px]" />
          </div>
        </div>
        <div className="px-4 mt-9">
          <div className="text-[#111111] text-lg font-bold">Super Savings</div>
          <div className="mt-4">
            <Chart />
          </div>
        </div>
        <div className="mt-auto mb-8 px-4">
          <div
            onClick={() => setOpened('login')}
            className="h-[50px] px-6 bg-[#007aff] rounded-xl justify-center items-center flex"
          >
            <div>
              <Users strokeWidth="3px" className="text-white translate-y-[-1px]" size={22} />
            </div>
            <div className="ml-1.5 text-center text-white text-lg font-semibold">JOIN 12,510 SAVERS</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
