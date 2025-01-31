'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useState } from 'react';

// SendCrypto.tsx

interface Contact {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
}

interface CryptoBalance {
  symbol: string;
  name: string;
  subtitle: string;
  balance: string;
}

const SendCrypto: React.FC = () => {
  const [amount, setAmount] = useState<string>('20');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const cryptoBalance: CryptoBalance = {
    symbol: '₮',
    name: 'USDt',
    subtitle: 'Earning 6.2%',
    balance: '2,168 USDC',
  };

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Bob',
      subtitle: 'My Friend 2',
      avatar: '🎲',
    },
    {
      id: '2',
      name: 'Charlie',
      subtitle: 'My Friend 3',
      avatar: '🎲',
    },
  ];

  const CryptoSelector = () => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3">
          {cryptoBalance.symbol}
        </div>
        <div>
          <div className="font-medium">{cryptoBalance.name}</div>
          <div className="text-sm text-gray-500">{cryptoBalance.subtitle}</div>
        </div>
      </div>
      <div className="text-gray-600">{cryptoBalance.balance}</div>
    </div>
  );

  const AmountInput = () => (
    <div className="py-4 border-b border-gray-200">
      <div className="text-sm text-gray-500 mb-2">Amount</div>
      <input
        disabled
        type="text"
        value={`${amount} USDt`}
        onChange={(e) => setAmount(e.target.value)}
        className="text-lg font-medium w-full outline-none"
      />
    </div>
  );

  const ContactItem: React.FC<Contact> = ({ name, subtitle, avatar }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-black rounded-xl mr-3 flex items-center justify-center">
          <div className="text-white">{avatar}</div>
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  );

  const handleSelectContact = async () => {
    try {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=t.me/GluonMoneyBot/gluon?startapp=send`);
    } catch (e) {
      console.error('switchInlineQuery error:', e);
      alert(`error ${e}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Send to Alice</h1>

      <CryptoSelector />
      <AmountInput />

      <div className="mt-6">
        {contacts.map((contact) => (
          <ContactItem key={contact.id} {...contact} />
        ))}
      </div>

      <button
        onClick={handleSelectContact}
        className="w-full py-3 px-4 bg-gray-100 rounded-xl mt-6 text-blue-500 font-medium"
      >
        My Telegram Contacts
      </button>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <div className="bg-white flex flex-col h-full">
        <div className="h-11 flex-col flex">
          <div className="relative flex w-full justify-center items-center pt-2">
            <Link href="/tgpwa" className="absolute left-3">
              <ChevronLeft size={28} />
            </Link>
            <div className="text-center text-[#111111] text-lg font-semibold">Send</div>
          </div>
        </div>
        <SendCrypto />
      </div>
    </>
  );
};

export default Page;
