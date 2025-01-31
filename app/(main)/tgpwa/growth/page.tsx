'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SuperGrowthComponent = () => {
  return (
    <div className="bg-white flex flex-col h-full">
      <div className="h-11 flex-col flex">
        <div className="relative flex w-full justify-center items-center pt-2">
          <Link href="/tgpwa" className="absolute left-3">
            <ChevronLeft size={28} />
          </Link>
          <div className="text-center text-[#111111] text-lg font-semibold">Gluon</div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4">Super Growth</h2>
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 rounded-full p-2 mr-4">
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M12 16V8" />
              <path d="M8 12H16" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Bitcoin + Yield</p>
            <p className="text-gray-900 font-medium">1.2% Staked BTC</p>
          </div>
        </div>
        <div className="bg-green-100 rounded-lg p-4 mb-4">
          <p className="text-green-600 font-medium">Earn 0.3% Referrer Bonus</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2 mr-4">
              <svg
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">Bob</p>
              <p className="text-gray-500 text-sm">My Friend 2</p>
            </div>
            <div className="ml-auto">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2 mr-4">
              <svg
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">Charlie</p>
              <p className="text-gray-500 text-sm">My Friend 3</p>
            </div>
            <div className="ml-auto">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2 mr-4">
              <svg
                className="h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">Someone</p>
              <p className="text-gray-500 text-sm">My Friend</p>
            </div>
            <div className="ml-auto">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <button
            className="w-full bg-blue-500 text-white rounded-xl py-4 font-medium"
            onClick={() => {
              try {
                window.Telegram.WebApp.openTelegramLink(
                  `https://t.me/share/url?url=t.me/GluonMoneyBot/gluon?startapp=growth`
                );
              } catch (e) {
                console.error('switchInlineQuery error:', e);
                alert(`error ${e}`);
              }
            }}
          >
            Send to Friend
          </button>
        </div>
      </div>
      {/* <Footer active="send" /> */}
    </div>
  );
};

export default SuperGrowthComponent;
