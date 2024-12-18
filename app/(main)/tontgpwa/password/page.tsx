'use client';
import { useSetAtom } from 'jotai';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { type Viewport } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import GluonImg from '../assets/gluon-img.png';

import { Digit } from '../components/Deposit';

import { cn, delay } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';
import { Button } from '@/ui-components/Button';

export const viewport: Viewport = {
  themeColor: '#f7f6f1',
};

const Page = () => {
  const setOpened = useSetAtom(openedModalAtom);
  const [val, setVal] = useState(0);
  const router = useRouter();

  const onInput = () => {
    if (val >= 3) {
      setVal((val) => val + 1);
      delay(200).then(() => {
        router.push('/tontgpwa/tgwallet?type=confirmation');
      });
    } else {
      setVal((val) => val + 1);
    }
  };

  return (
    <>
      <div className="bg-[#f7f6f1] flex flex-col h-full">
        <div className="flex-col flex">
          <div className="h-12 relative flex w-full items-center pt-2 border border-b pb-2">
            <Link href="/tontgpwa" className="ml-3">
              <ArrowLeft />
            </Link>
            <div className="text-left font-semibold ml-3 text-black text-xl">Wallet</div>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center mt-12">
            <svg width="43" height="46" viewBox="0 0 43 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.0412 7.10877C6.24212 9.94282 6.77583 12.919 7.99432 15.229C6.83997 16.5132 5.91864 17.9363 5.26087 19.4511H4.2501C2.17256 19.4511 0.500031 20.9721 0.500031 22.8617V27.2103C0.500031 29.0998 2.17256 30.6209 4.2501 30.6209H5.25061C6.29041 33.0075 7.97909 35.1531 10.1799 36.8839L12.3378 43.4535C12.7321 44.7921 13.5493 45.4999 14.7958 45.4999H16.4365C17.683 45.4999 18.4022 44.663 18.4022 43.4535V40.701C21.6085 41.4254 24.7489 41.3688 27.7013 40.7608V43.3245C27.7013 44.4754 28.6022 45.4997 29.9073 45.4997H31.9699C33.2164 45.4997 34.1853 44.4482 34.4528 43.4534L35.9558 37.0717C39.9937 34.0048 42.3046 29.6299 42.3133 25.0359C42.3133 13.649 30.3423 8.0584 18.3187 9.37883L12.1077 6.11747C10.6435 5.44123 9.01869 5.63252 8.0412 7.10877Z"
                fill="#FFAECD"
              />
              <path
                d="M7.99421 15.229C7.40767 15.8815 6.88316 16.572 6.42095 17.2901C6.9324 18.1164 7.55555 18.9723 8.33405 19.7715C9.20302 20.7163 10.78 20.2043 10.9283 18.9292C9.00918 17.2628 7.99421 15.229 7.99421 15.229ZM18.6217 38.444C17.2108 38.444 16.13 39.0764 16.13 40.6559C16.13 41.5065 16.13 42.3615 16.13 43.2136H15.2936C14.1863 43.2149 13.4619 44.374 13.9459 45.3698C14.2028 45.4562 14.4856 45.5002 14.7955 45.5002H16.4362C17.6827 45.5002 18.402 44.6634 18.402 43.4538V40.7014C19.9641 41.0504 21.5721 41.2309 23.1877 41.2375C24.4537 41.2328 25.7135 41.1136 26.9523 40.8976C27.4074 39.8348 26.54 38.6783 25.3923 38.8176C23.1626 39.1227 20.5241 38.6007 18.6217 38.444ZM39.3611 28.4581C38.4846 31.2248 36.8675 33.3411 34.7322 35.1085C34.403 35.4334 33.9346 35.9202 33.6921 36.6803C33.6921 36.6803 32.5847 41.6065 32.2581 42.8254C32.1566 43.2042 31.8024 43.2136 31.6033 43.2136H30.5471C29.241 43.2136 28.7943 44.4892 29.1936 45.3772C29.4152 45.4495 29.6504 45.5002 29.907 45.5002H31.9695C33.216 45.5002 34.1848 44.4486 34.4524 43.4538L35.9553 37.0729C39.1425 34.6522 41.2469 31.4151 41.9993 27.9C40.9158 26.9022 39.6749 27.2869 39.3611 28.4581Z"
                fill="#F69AC6"
              />
              <path
                d="M27.9488 0.503418C22.7245 0.502823 18.4889 4.7377 18.4887 9.96205C18.4928 11.951 19.1238 13.888 20.2919 15.4978C25.0253 14.5099 30.4586 15.3104 33.8947 17.3142C36.1153 15.5193 37.4063 12.8174 37.4075 9.96205C37.4073 4.73827 33.1726 0.503616 27.9488 0.503418Z"
                fill="#FFC861"
              />
              <path
                d="M34.6623 12.341C34.1842 13.6921 33.9083 14.0395 33.552 14.3875C30.6218 13.3786 27.7568 12.7019 24.1372 12.6852C22.9057 12.7212 22.2396 14.1436 23.0005 15.1126C26.4598 14.9079 30.6632 15.4709 33.8947 17.3142C35.6047 15.9306 36.779 13.9943 37.2156 11.8385C36.1789 10.9719 35.0678 11.2078 34.6623 12.341Z"
                fill="#FFAB61"
              />
              <path
                d="M27.3878 3.10362V3.40684C24.4544 4.29231 25.1861 8.63937 28.1085 8.63937C29.7371 8.63937 29.5246 11.0183 28.1964 11.0183C27.5651 11.0183 27.1274 10.7207 26.9673 10.1233C26.7193 9.13779 25.2395 9.53392 25.5171 10.5115C25.768 11.448 26.5031 12.1352 27.3877 12.3851V12.5155C27.3651 13.5379 28.9105 13.5379 28.8878 12.5155V12.3675C31.8409 11.207 30.8231 7.13941 28.1685 7.13941C26.5097 7.13941 26.7266 4.73846 28.0719 4.73846C28.8089 4.73846 29.1626 5.1065 29.3097 5.65544C29.5532 6.65332 31.0529 6.24739 30.7599 5.26287C30.509 4.32617 29.7726 3.6391 28.8878 3.38927V3.10362C28.8878 1.89941 27.3878 2.10462 27.3878 3.10362Z"
                fill="#4D4D4D"
              />
            </svg>
          </div>
          <div className="mt-4 text-xl text-center">Enter your Wallet Password</div>
          <div className="flex justify-center gap-2 mt-8">
            <div
              className={cn('rounded-full border h-4 w-4', {
                'bg-[#000]': val > 0,
              })}
            />
            <div
              className={cn('rounded-full border h-4 w-4', {
                'bg-[#000]': val > 1,
              })}
            />
            <div
              className={cn('rounded-full border h-4 w-4', {
                'bg-[#000]': val > 2,
              })}
            />
            <div
              className={cn('rounded-full border h-4 w-4', {
                'bg-[#000]': val > 3,
              })}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-10 mx-4 items-center justify-center">
          <Digit type="rounded" onClick={onInput} value="1" />
          <Digit type="rounded" onClick={onInput} value="2" />
          <Digit type="rounded" onClick={onInput} value="3" />
          <Digit type="rounded" onClick={onInput} value="4" />
          <Digit type="rounded" onClick={onInput} value="5" />
          <Digit type="rounded" onClick={onInput} value="6" />
          <Digit type="rounded" onClick={onInput} value="7" />
          <Digit type="rounded" onClick={onInput} value="8" />
          <Digit type="rounded" onClick={onInput} value="9" />
          <div />
          <Digit type="rounded" onClick={onInput} value="0" />
          <Digit type="rounded" onClick={() => setVal((val) => val - 1)} />
        </div>

        <div className="mt-auto flex mb-12 justify-center">
          <div className="text-[#5d9cce]">Forgot Password?</div>
        </div>
      </div>
    </>
  );
};

export default Page;
