'use client';
import Link from 'next/link';

import GluonLogo from '../assets/gluon-logo.svg';
import { useStartParam } from '../hooks';

const Page = () => {
  const { startapp, amount } = useStartParam();

  const isSend = startapp === 'send';
  const isRaffle = startapp === 'raffle';
  const isEarn = startapp === 'earn';

  return (
    <>
      <div className="bg-white flex flex-col h-full">
        <div className="flex flex-col items-center min-h-screen bg-white px-4 pt-16">
          {/* Logo */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <GluonLogo />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-16">Welcome to Gluon</h1>

          {/* Message Box */}
          {isSend ? (
            <div className="w-full bg-gray-50 rounded-xl p-6 mb-auto">
              <p className="mb-2">
                <span>Alice sent you </span>
                <span className="font-bold">{amount} USD in Gluon</span>
                <span>.</span>
              </p>
              <p className="text-gray-700">
                Smarter Money, Better Returns only in Gluon. Tap👇 to <span className="font-bold">get started!</span>
              </p>
            </div>
          ) : isRaffle ? (
            <div className="w-full bg-gray-50 rounded-xl p-6 mb-auto">
              <p className="mb-2">
                <span>You’ve won </span>
                <span className="font-bold">{amount} USDT!</span>
              </p>
              <br />
              <p className="text-gray-700">
                With Gulon it is super easy to accept crypto and earn, tap join to{' '}
                <span className="font-bold">get started!</span>
              </p>
            </div>
          ) : isEarn ? (
            <div className="w-full bg-gray-50 rounded-xl p-6 mb-auto">
              <p className="text-gray-700">
                Smarter Money, Better Returns only in Gluon. Tap👇 to <span className="font-bold">get started!</span>
              </p>
            </div>
          ) : null}

          <div className="w-full p-4">
            <Link
              href={
                isSend
                  ? '/tgpwa/receive'
                  : isRaffle
                    ? '/tgpwa?rafflesuccess=true'
                    : isEarn
                      ? '/tgpwa/growthjoin'
                      : '/tgpwa'
              }
              className="w-full bg-blue-500 text-white rounded-xl py-4 font-medium flex items-center justify-center space-x-2"
              onClick={() => {
                // 处理加入按钮点击
                console.log('Join clicked');
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>JOIN GLUON</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
