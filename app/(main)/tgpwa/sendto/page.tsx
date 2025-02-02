'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState, type FormEvent } from 'react';

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

const isNumber = (s: string, decimals = 4) => {
  const reg = new RegExp(`(^[0-9]{0,6}$)|(^[0-9]{0,6}[.][0-9]{0,${decimals}}$)`);
  return reg.test(s) && !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
};

const SendCrypto: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const cryptoBalance: CryptoBalance = {
    symbol: '₮',
    name: 'USDT',
    subtitle: 'Earning 6.2%',
    balance: '2,168 USDT',
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
    if (typeof window === 'undefined') return;
    (window as any).Telegram.WebApp.switchInlineQuery.switchInlineQuery(`share ${btoa(`send-${parseInt(amount || '20')}`)}`, ['users', 'bots'])
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Send</h1> */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex justify-center w-12 mr-3">
            <img width={48} height={48} src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" />
          </div>
          <div>
            <div className="font-medium">{cryptoBalance.name}</div>
            <div className="text-sm text-gray-500">{cryptoBalance.subtitle}</div>
          </div>
        </div>
        <div className="text-gray-600">{cryptoBalance.balance}</div>
      </div>
      <div className="py-4 border-b border-gray-200 flex items-center gap-3">
        <div className="text-sm text-gray-500 w-12">Amount</div>
        <input
          placeholder="20 USDT"
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
          className="text-lg font-medium w-full outline-none"
        />
      </div>

      <div className="mt-6">
        {contacts.map((contact) => (
          <ContactItem key={contact.id} {...contact} />
        ))}
      </div>

      <button
        onClick={handleSelectContact}
        className="w-full py-3 px-4 bg-gray-100 rounded-xl mt-6 text-blue-500 font-medium"
      >
        Send to chat
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
            <div className="text-center text-[#111111] text-xl font-semibold">Send</div>
          </div>
        </div>
        <SendCrypto />
      </div>
    </>
  );
};

export default Page;
