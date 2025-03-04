'use client';
import { useSetAtom } from 'jotai';
import { AlignJustify } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import CheckInImg from '../assets/checkin.png';
import GrowthImg from '../assets/growth-img.svg';

import { openedModalAtom } from '@/state/modal';

export const HomeHeader = () => {
  const setOpenedModal = useSetAtom(openedModalAtom);

  return (
    <div className="bg-gradient4 px-4 pt-2 relative flex flex-col">
      <div className="absolute right-4 top-14">
        <Image src={CheckInImg} alt="Check In" width={122} />
      </div>
      <div className="absolute right-5 top-[60px]">
        <GrowthImg />
      </div>
      <Link href="/tgpwa/setting" className="flex justify-center relative w-full">
        <AlignJustify className="w-6 h-6 absolute left-0 top-0.5" />
        <span className="text-lg font-semibold">Gluon Money</span>
      </Link>
      <div className="ml-1">
        <div className="inline-flex mt-6 px-3 py-1 bg-[#111111]/20 rounded-[15px] justify-center items-center">
          <div className="text-center text-xs font-medium">12,510 Savers</div>
        </div>
        <div className="my-2 text-[64px] leading-none font-bold flex">
          5.6%
          <div className="text-3xl mt-auto">p.a.</div>
        </div>
        <div className="flex gap-2 items-center">
          {/* <div>
            <Image src={SavingsIcon} alt="Savings Icon" width={56} />
          </div> */}
          <span className="text-xl">Super Savings - withdraw anytime</span>
        </div>
        <div className="my-5 px-5 py-2 bg-[#007aff]/60 rounded-xl justify-between items-center flex">
          <div className="text-base font-semibold">Super Savings</div>
          <div className="px-4 py-1.5 bg-[#f7f6f0] rounded-2xl justify-center items-center flex">
            <div onClick={() => setOpenedModal('deposit')} className="text-center text-[#111111] text-base font-medium">
              JOIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
