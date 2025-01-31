'use client';

import { useState } from 'react';

export default function RafflePage() {
  const [total, setTotal] = useState<string>('');
  const [draws, setDraws] = useState<number>(1);

  const handleIncrement = () => {
    setDraws((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setDraws((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Raffle</h1>

      {/* USDC Balance */}
      <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3">
            ₮
          </div>
          <div>
            <div className="font-medium">USDC</div>
            <div className="text-sm text-gray-500">Earning 6.2%</div>
          </div>
        </div>
        <div className="text-gray-600">2,168 USDC</div>
      </div>

      {/* Total Input */}
      <div className="mt-6">
        <div className="font-medium mb-2">Total</div>
        <input
          type="text"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Max 2168 USDC"
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
        <button
          className="w-full bg-blue-500 text-white rounded-xl py-4 font-medium"
          onClick={() => {
            try {
              window.Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?url=t.me/GluonMoneyBot/webapp?startapp=raffle`
              );
            } catch (e) {
              console.error('switchInlineQuery error:', e);
              alert(`error ${e}`);
            }
          }}
        >
          Send to Group
        </button>
      </div>
    </div>
  );
}
