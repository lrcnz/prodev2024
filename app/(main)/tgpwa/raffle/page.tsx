'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { type FormEvent, useState } from 'react';

const isNumber = (s: string, decimals = 4) => {
  const reg = new RegExp(`(^[0-9]{0,6}$)|(^[0-9]{0,6}[.][0-9]{0,${decimals}}$)`);
  return reg.test(s) && !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
};

export default function RafflePage() {
  const [amount, setAmount] = useState<string>('');
  const [draws, setDraws] = useState<number>(2);

  const handleIncrement = () => {
    setDraws((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setDraws((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="h-11 flex-col flex bg-white">
        <div className="relative flex w-full justify-center items-center pt-2">
          <Link href="/tgpwa/send" className="absolute left-3">
            <ChevronLeft size={28} />
          </Link>
          <div className="text-center text-[#111111] text-xl font-semibold">Raffle</div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-4 flex-1">
        {/* USDT Balance */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3">
              ₮
            </div>
            <div>
              <div className="font-medium">USDT</div>
              <div className="text-sm text-gray-500">Earning 6.2%</div>
            </div>
          </div>
          <div className="text-gray-600">2,168 USDT</div>
        </div>

        {/* Total Input */}
        <div className="mt-6">
          <div className="font-medium mb-2">Total</div>
          <input
            type="text"
            inputMode="decimal"
            onChange={(e) => setAmount(e.target.value)}
            onInput={(v: FormEvent<HTMLInputElement>) => {
              if (v.currentTarget.value === '.') {
                v.currentTarget.value = '0.';
              }

              v.currentTarget.value =
                !!v.currentTarget.value && isNumber(v.currentTarget.value, 4) && parseFloat(v.currentTarget.value) >= 0
                  ? v.currentTarget.value
                  : '';
            }}
            value={amount}
            placeholder="Max 2168 USDT"
            className="w-full p-2 border-b border-gray-200 outline-none text-gray-600"
          />
        </div>

        {/* Number of Draws */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <div className="font-medium">Number of draws</div>
            <div className="flex items-center bg-gray-100 rounded-lg">
              <button onClick={handleDecrement} className="px-4 py-2 text-xl text-gray-500">
                −
              </button>
              <span className="px-4">{draws}</span>
              <button onClick={handleIncrement} className="px-4 py-2 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="mt-auto">
          <Link href={`/tgpwa/raffleto?amount=${amount}&draws=${draws}`}>
            <button className="w-full bg-blue-500 text-white rounded-xl py-4 font-medium">Send to Group</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
