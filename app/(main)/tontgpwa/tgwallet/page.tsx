'use client';
import { useSetAtom } from 'jotai';
import { ArrowLeft, Check, Orbit } from 'lucide-react';
import { type Viewport } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import GluonImg from '../assets/gluon-img.png';

import Ring from '../assets/ring-resize.svg';

import { cn, delay } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';
import { Button } from '@/ui-components/Button';

export const viewport: Viewport = {
  themeColor: '#f7f6f1',
};

const Page = () => {
  const setOpened = useSetAtom(openedModalAtom);

  const searchParams = useSearchParams();
  const [loadingFinish, setLoadingFinish] = useState(false);

  const type = searchParams.get('type');
  const [loading, setLoading] = useState(type === 'confirmation');
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoadingFinish(true);
        delay(500).then(() => {
          router.push('/tontgpwa/successful');
        });
      }, 1500);
    }
  }, [loading, router]);

  return (
    <>
      <div className="bg-[#f7f6f1] flex flex-col h-full">
        <div className="flex-col flex">
          <div className="h-12 relative flex w-full items-center pt-2 border border-b pb-2">
            <Link href="/tontgpwa" className="ml-3">
              <ArrowLeft />
            </Link>
            <div className="text-left font-semibold ml-3 text-black text-xl">Wallet</div>
          </div>
          <div className="pl-4 py-3 bg-white">
            <div className="text-[#6694d1] font-bold text-xl ">App</div>
            <div className="flex mt-1 gap-2 items-center">
              <div>
                <Image className="h-10 w-10" src={GluonImg} alt="" />
              </div>
              <div>
                <div className="font-bold ">Gluon</div>
                <div className="text-gray-500">www.gluon-money.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-4 py-3 bg-white mt-4">
          <div className="text-[#6694d1] font-bold text-base">Action to Confirm</div>
          <div className="flex mt-1 gap-2 items-center">
            <div>
              <div className="h-12 text-white rounded-full w-12 bg-[#6ea9ee] flex justify-center items-center font-bold text-2xl">
                <Orbit />
              </div>
            </div>
            <div className="w-full flex justify-between items-center py-2">
              <div>
                <div className="font-bold ">Called Contract</div>
                <div className="text-gray-500">UQCH...5_0f</div>
              </div>
              <div className="mr-4 text-right">
                <div>1200 USDT</div>
                <div className="text-gray-500">Today</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-500 ml-4">Fee 0.00343844 TON (≈ $0.00)</div>
        <div className="mt-4 pl-4 py-3 bg-white">
          <div className="text-[#6694d1] text-lg ">Balance after confirmation</div>
          <div className="flex mt-1 gap-2 justify-between text-lg">
            <div className=" ">Ton Balance</div>
            <div className=" mr-4">0 TON</div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="pl-4 py-3 bg-white h-[80px] flex items-center justify-center">
            {loading ? (
              loadingFinish ? (
                <div className="flex justify-center items-center">
                  <div className="h-8 w-8 rounded-full bg-[#007aff] flex items-center justify-center">
                    <Check className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="h-8 w-8">
                    <Ring className="text-[#007aff]" />
                  </div>
                </div>
              )
            ) : (
              <div className="w-full">
                <div className="flex mt-1 gap-2 items-center">
                  <div>
                    <div className="h-10 text-white rounded-full w-10 bg-[#6ea9ee] flex justify-center items-center font-bold text-2xl">
                      L
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">TON Space Balance</div>
                    <div className="font-bold ">0.81265496 TON</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {loading ? (
            <div className="mt-4 mb-8 px-4 flex gap-8 items-center justify-between">
              <Link
                href="/tontgpwa/account"
                className={cn('w-full h-[50px] bg-[#007aff] px-6 rounded-xl justify-center items-center flex', {})}
              >
                <div className="ml-1.5 text-center text-white text-lg font-semibold">Back to Gluon</div>
              </Link>
            </div>
          ) : (
            <div className="mt-4 mb-8 px-4 flex gap-8 items-center justify-between">
              <Button
                className={cn('w-full rounded-xl h-[50px] bg-[#d7dde6]', {
                  'bg-[#d7dde6] text-[#80a5c5]': !loading,
                  'bg-[#ccc] text-white': loading,
                })}
                disabled={!loading}
              >
                <div className="ml-1.5 text-center text-lg font-semibold">Decline</div>
              </Button>
              <Link
                href="/tontgpwa/password"
                className={cn('w-full h-[50px] px-6 rounded-xl justify-center items-center flex', {
                  'bg-[#007aff]': !loading,
                  'bg-[#ccc]': loading,
                })}
              >
                <div className="ml-1.5 text-center text-white text-lg font-semibold">Confirm</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
