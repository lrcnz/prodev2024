'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Footer } from '../components/Footer';
import { useStartParam } from '../hooks';

interface WalletBalanceProps {
  balance: string;
  change: string;
}

interface CryptoItemProps {
  icon: React.ReactNode;
  name: string;
  subtitle?: string;
  amount: string;
  symbol: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, change }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="text-2xl font-bold flex items-center">Wallet</div>
    <div className="bg-[#E8FFDB] rounded-xl p-4 flex items-baseline">
      <span className="text-2xl font-bold">${balance}</span>
      <span className="text-sm text-green-600 ml-2">+${change} Yesterday</span>
    </div>
  </div>
);

const CryptoItem: React.FC<CryptoItemProps> = ({ icon, name, subtitle, amount, symbol }) => {
  const router = useRouter();

  return (
    <div
      // onClick={() => router.push('/tgpwa/send')}
      className="flex items-center justify-between py-4 border-b border-gray-100"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">{icon}</div>
        <div>
          <div className="font-medium">{name}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          {amount} {symbol}
        </span>
        {/* <ChevronRight className="text-gray-400" size={20} /> */}
      </div>
    </div>
  );
};

const CreateRaffle: React.FC = () => (
  <Link href="/tgpwa/raffle" className="flex items-center justify-between py-4 mt-auto mb-[92px]">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-black rounded-xl mr-3 flex items-center justify-center">
        <div className="text-white text-2xl">🎲</div>
      </div>
      <Link href="/tgpwa/raffle" className="font-medium">
        Create a Raffle
      </Link>
    </div>
    <div className="flex items-center">
      <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center mr-2">
        <span className="text-blue-500 text-sm">i</span>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  </Link>
);

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  amount: string;
  subtitle?: string;
}

const cryptoData: CryptoData[] = [
  {
    id: 'USDT',
    name: 'USDT',
    symbol: 'USDT',
    amount: '2,168',
    subtitle: 'Earning 6.2%',
  },
  {
    id: 'ton',
    name: 'TON Coin',
    symbol: 'TON',
    amount: '58',
    subtitle: 'Staked, Earning 1.2%',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    amount: '261',
  },
];

const CryptoWallet: React.FC = () => {
  const renderCryptoIcon = (id: string): React.ReactNode => {
    switch (id) {
      case 'USDT':
        return <img width={48} height={48} src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" />;
      case 'ton':
        return <img width={48} height={48} src="https://cryptologos.cc/logos/toncoin-ton-logo.png" alt="TON" />;
      case 'sol':
        return <img width={48} height={48} src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col flex-1">
      <WalletBalance balance="2,315.5" change="5" />

      <div className="space-y-2">
        {cryptoData.map((crypto) => (
          <CryptoItem
            key={crypto.id}
            icon={renderCryptoIcon(crypto.id)}
            name={crypto.name}
            subtitle={crypto.subtitle}
            amount={crypto.amount}
            symbol={crypto.symbol}
          />
        ))}
      </div>

      <div className="mt-auto">
        <CreateRaffle />
      </div>
    </div>
  );
};

const SendWallet: React.FC = () => {
  const { amount } = useStartParam();
  const renderCryptoIcon = (id: string): React.ReactNode => {
    switch (id) {
      case 'USDT':
        return <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white">₮</div>;
      case 'ton':
        return (
          <div className="w-full h-full bg-blue-500 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rotate-45" />
          </div>
        );
      case 'sol':
        return (
          <div className="w-full h-full bg-purple-900 flex items-center justify-center">
            <div className="text-white text-sm">SOL</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold flex items-center">Super Growth</div>
        {/* <div className="bg-[#E8FFDB] rounded-xl p-4 flex items-baseline">
          <span className="text-2xl font-bold">${balance}</span>
          <span className="text-sm text-green-600 ml-2">+${change} Yesterday</span>
        </div> */}
      </div>

      <div className="space-y-2">
        {[cryptoData[0]].map((crypto) => (
          <CryptoItem
            key={crypto.id}
            icon={renderCryptoIcon(crypto.id)}
            name={crypto.name}
            subtitle={crypto.subtitle}
            amount={amount?.toString() || '20'}
            symbol={crypto.symbol}
          />
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  const { startapp } = useStartParam();

  const isSend = startapp === 'send';
  return (
    <>
      <div className="bg-white flex flex-col h-full">
        <SendWallet />
        <div className="flex-1 flex items-center justify-center mb-32">
          <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M115.893 30.2941L46.5599 104.961C45.5547 106.045 44.1448 106.663 42.6666 106.667C41.249 106.676 39.8864 106.119 38.8799 105.121L12.2133 78.4541C10.1219 76.3628 10.1219 72.9721 12.2133 70.8808C14.3046 68.7895 17.6953 68.7895 19.7866 70.8808L42.6666 93.6541L108.107 23.0408C109.362 21.4929 111.375 20.7739 113.327 21.1766C115.279 21.5793 116.843 23.0366 117.383 24.9549C117.923 26.8732 117.348 28.9325 115.893 30.2941Z"
              fill="#007AFF"
            />
          </svg>
        </div>
        <Footer active="send" />
      </div>
    </>
  );
};

export default Page;
