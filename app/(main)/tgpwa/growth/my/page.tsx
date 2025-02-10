'use client';
import { ChevronLeft, TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Footer } from '../../components/Footer';

export default function SuperGrowth() {
  const handleSelectContact = async () => {
    if (typeof window === 'undefined') return;
    (window as any).Telegram.WebApp.switchInlineQuery(`share ${btoa(`earn`)}`, ['groups', 'channels', 'users', 'bots']);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-6 max-w-md bg-white rounded-lg">
        <div className="mt-8 mb-6">
          <div className="h-11 flex-col flex">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center">My Referrals</div>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-6 mt-1" />
        </div>

        <div className="space-y-4 mt-4">
          {/* Bitcoin + Yield Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <div className="font-semibold">Bitcoin + Yield</div>
                <div className="text-gray-500 text-sm">1.2% Staked BTC</div>
              </div>
            </div>

            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-500">112 Referred</span>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-2" />

          {/* Stable Saving Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="font-semibold">Stable Saving</div>
                <div className="text-gray-500 text-sm">3.2% Safe Heaven</div>
              </div>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-500">21 Referred</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gray-200 my-2" />

        {/* Earnings Section */}
        <h2 className="text-xl font-bold mt-6">My Earnings</h2>
        <div className="h-px bg-gray-200 mt-1 mb-5" />
        <div className="bg-green-100 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$2,315.5</span>
            <div className="flex items-center text-green-600">
              <span className="text-sm">+$5</span>
              <span className="text-xs ml-1">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
      <Footer active="send" />
    </div>
  );
}
