'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useState } from 'react';

const Page = () => {
  return (
    <>
      <div className="bg-white flex flex-col h-full">
        <div className="flex flex-col items-center min-h-screen bg-white px-4 pt-16">
          {/* Logo */}
          <div className="w-24 h-24 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white text-5xl font-bold">G</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-16">Welcome to Gluon</h1>

          {/* Message Box */}
          <div className="w-full bg-gray-50 rounded-xl p-6 mb-auto">
            <p className="mb-2">
              <span>Alice sent you </span>
              <span className="font-bold">20 USDC</span>
              <span>.</span>
            </p>
            <p className="text-gray-700">
              With Gluon it is super easy to accept crypto and earn from it, tap join to{' '}
              <span className="font-bold">get started!</span>
            </p>
          </div>

          {/* Join Button */}
          <div className="w-full p-4">
            <Link
              href="/tontgpwa"
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
