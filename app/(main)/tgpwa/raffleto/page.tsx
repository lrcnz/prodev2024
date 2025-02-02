'use client';

import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function RafflePage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const draws = searchParams.get('draws');

  const handleSelectContact = async () => {
    if (typeof window === 'undefined') return;
    (window as any).Telegram.WebApp.switchInlineQuery.switchInlineQuery(`share ${btoa(`raffle-${parseInt(amount || '200')}`)}`, [
      'groups',
      'channels',
      'users',
      'bots',
    ])
  };

  return (
    <div className="min-h-screen bg-white flex flex-col ">
      {/* Header */}
      <div className="h-11 flex-col flex">
        <div className="relative flex w-full justify-center items-center pt-2">
          <Link href="/tgpwa/raffle" className="absolute left-3">
            <ChevronLeft size={28} />
          </Link>
          <div className="text-center text-[#111111] text-xl font-semibold">Raffle</div>
        </div>
      </div>
      <div className="p-6  flex flex-col gap-8 flex-1">
        <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md">
          <img width={48} height={48} src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" />
          <div>
            <p className="text-lg font-bold">{amount} USDC Raffle</p>
            <p className="text-gray-500 text-sm">{draws || 30} Draws</p>
          </div>
        </div>

        {/* Channels */}
        <div>
          <h2 className="text-gray-400 text-sm font-semibold mb-2">CHANNELS</h2>
          <div className="space-y-4">
            <ChannelItem name="Channel 1" description="Community" />
            <ChannelItem name="Channel 2" description="Another Community" />
          </div>
        </div>

        <div className="mt-auto">
          {/* Bottom Button */}
          <button
            onClick={handleSelectContact}
            className="bg-blue-500 text-white font-medium w-full py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <SendIcon />
            Send to Group
          </button>
        </div>
      </div>
    </div>
  );
}

// 单个频道组件
const ChannelItem = ({ name, description }: { name: string; description: string }) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
        <svg
          width="52"
          height="60"
          viewBox="0 0 52 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="26" cy="30" r="26" fill="url(#pattern0_1924_3212)" />
          <defs>
            <pattern id="pattern0_1924_3212" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_1924_3212" transform="scale(0.015625)" />
            </pattern>
            <image
              id="image0_1924_3212"
              width="64"
              height="64"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC"
            />
          </defs>
        </svg>
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
    <span className="text-gray-400">{'>'}</span>
  </div>
);

// 发送图标组件
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);
