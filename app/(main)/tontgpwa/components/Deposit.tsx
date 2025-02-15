'use client';

import { useTonAddress } from '@tonconnect/ui-react';
import { AnimatePresence, motion } from 'framer-motion';

import { useAtom } from 'jotai';

import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { depositValueAtom } from '../hooks/atoms';

import { useJettonBalance } from '../hooks/useJettonsBalance';

import { useTransfer } from '../hooks/useTransfer';

import { useFormatBalance } from '@/hooks/useFormatBalance';
import { cn } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';
import { AlertDialog, AlertDialogOverlay, AlertDialogPortal } from '@/ui-components/AlertDialog';

const Menu = () => {
  const userFriendlyAddress = useTonAddress();
  const { balance } = useJettonBalance(userFriendlyAddress);
  const formatBalance = useFormatBalance({
    show: true,
  });

  return (
    <div className="flex flex-col gap-4 mt-6 mb-6">
      <div className="h-12 px-4 py-2 bg-[#f7f6f0] rounded-lg  border-2 border-[#111111] justify-between items-center flex">
        <div className="justify-start items-center gap-2 flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.1036 0H3.89543C0.915315 0 -0.973467 3.21456 0.525742 5.81325L10.5288 23.1509C11.1816 24.283 12.8174 24.283 13.4702 23.1509L23.4753 5.81325C24.9726 3.21871 23.0837 0 20.1057 0H20.1036ZM10.5207 17.9516L8.3422 13.7355L3.08568 4.33442C2.73891 3.73271 3.16722 2.96163 3.89339 2.96163H10.5187V17.9537L10.5207 17.9516ZM20.9093 4.33239L15.6548 13.7376L13.4763 17.9516V2.9596H20.1016C20.8278 2.9596 21.2561 3.73067 20.9093 4.33239Z"
              fill="#111111"
            />
          </svg>

          <div className="w-[120px] text-[#111111] text-base leading-none">Balance on Ton Wallet</div>
        </div>
        <div className="justify-end items-center gap-1 flex">
          <div className="text-center text-[#111111] text-base font-semibold">
            {formatBalance(balance, { decimals: 6, mantissa: 2 })}
          </div>
          <div className="text-center text-[#111111]/60 text-base">USDC</div>
        </div>
      </div>
      <div className="h-10 px-4 py-2 bg-[#f7f6f0] rounded-lg border border-[#111111]/10 justify-between items-center flex">
        <div className="justify-start items-center gap-2 flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5971 6.83559C15.7832 6.83559 16.1004 6.86568 16.5488 6.92585C16.9971 6.98603 17.4877 7.15796 18.0206 7.44165C18.562 7.71674 19.0526 8.17666 19.4925 8.82141C19.4671 8.8472 19.3444 8.94176 19.1245 9.10509C18.9046 9.25983 18.6593 9.49194 18.3886 9.80142C18.1179 10.1023 17.881 10.4891 17.678 10.962C17.475 11.4262 17.3735 11.9807 17.3735 12.6254C17.3735 13.3647 17.5004 13.9923 17.7542 14.5081C18.0164 15.0239 18.3167 15.4408 18.655 15.7589C19.0019 16.0683 19.3064 16.2962 19.5686 16.4423C19.8393 16.5884 19.9831 16.6658 20 16.6744C19.9915 16.7088 19.8816 17.014 19.6701 17.5899C19.4671 18.1659 19.1287 18.8064 18.655 19.5113C18.2406 20.1216 17.7922 20.6847 17.3101 21.2005C16.8364 21.7163 16.2654 21.9742 15.5971 21.9742C15.1488 21.9742 14.7809 21.9097 14.4933 21.7808C14.2057 21.6432 13.9096 21.51 13.6051 21.381C13.3006 21.2435 12.8903 21.1747 12.3743 21.1747C11.8752 21.1747 11.4565 21.2435 11.1182 21.381C10.7883 21.5186 10.4711 21.6561 10.1665 21.7937C9.87047 21.9312 9.51943 22 9.1134 22C8.4959 22 7.95453 21.7507 7.48929 21.2521C7.02406 20.7535 6.54613 20.156 6.05551 19.4597C5.48877 18.6344 5.00238 17.6286 4.59635 16.4423C4.19878 15.2474 4 14.0438 4 12.8317C4 11.5336 4.24108 10.4462 4.72324 9.56931C5.20539 8.68386 5.82289 8.01762 6.57573 7.5706C7.33703 7.11498 8.12371 6.88717 8.93577 6.88717C9.36717 6.88717 9.7732 6.96024 10.1538 7.10638C10.5345 7.24393 10.8898 7.38577 11.2197 7.53191C11.558 7.67806 11.8625 7.75113 12.1332 7.75113C12.3955 7.75113 12.7 7.67376 13.0468 7.51902C13.3936 7.36428 13.7827 7.21384 14.2141 7.0677C14.6455 6.91296 15.1065 6.83559 15.5971 6.83559ZM14.8993 5.19794C14.5694 5.60198 14.1549 5.94154 13.6558 6.21663C13.1568 6.48313 12.6831 6.61638 12.2347 6.61638C12.1417 6.61638 12.0529 6.60778 11.9683 6.59059C11.9598 6.5648 11.9514 6.51752 11.9429 6.44874C11.9344 6.37997 11.9302 6.3069 11.9302 6.22953C11.9302 5.71373 12.0402 5.21513 12.2601 4.73372C12.48 4.24371 12.7296 3.83967 13.0087 3.5216C13.364 3.09177 13.8123 2.73501 14.3537 2.45132C14.8951 2.16763 15.411 2.01719 15.9017 2C15.927 2.11176 15.9397 2.245 15.9397 2.39974C15.9397 2.91554 15.8425 3.41844 15.6479 3.90845C15.4533 4.38986 15.2038 4.81969 14.8993 5.19794Z"
              fill="black"
            />
          </svg>
          <div className="w-[120px] text-[#111111] text-base leading-none">Apple Pay</div>
        </div>
        <div className="justify-end items-center gap-1 flex">
          <div className="text-center text-[#111111]/60 text-base">Up to</div>
          <div className="text-center text-[#111111] text-base font-semibold">4,000</div>
          <div className="text-center text-[#111111]/60 text-base">USD</div>
        </div>
      </div>

      <div className="h-12 px-4 py-2 bg-[#f7f6f0] rounded-lg border border-[#111111]/10 justify-between items-center flex">
        <div className="justify-start items-center gap-2 flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.25 1.5H3.75C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V6C1.5 6.59674 1.73705 7.16903 2.15901 7.59099C2.58097 8.01295 3.15326 8.25 3.75 8.25H5.25V20.25C5.25 20.8467 5.48705 21.419 5.90901 21.841C6.33097 22.2629 6.90326 22.5 7.5 22.5H16.5C17.0967 22.5 17.669 22.2629 18.091 21.841C18.5129 21.419 18.75 20.8467 18.75 20.25V8.25H20.25C20.8467 8.25 21.419 8.01295 21.841 7.59099C22.2629 7.16903 22.5 6.59674 22.5 6V3.75C22.5 3.15326 22.2629 2.58097 21.841 2.15901C21.419 1.73705 20.8467 1.5 20.25 1.5ZM6.75 20.25V6H8.25V9.75C8.25 9.94891 8.32902 10.1397 8.46967 10.2803C8.61032 10.421 8.80109 10.5 9 10.5C9.19891 10.5 9.38968 10.421 9.53033 10.2803C9.67098 10.1397 9.75 9.94891 9.75 9.75V6H14.25V21H7.5C7.30109 21 7.11032 20.921 6.96967 20.7803C6.82902 20.6397 6.75 20.4489 6.75 20.25ZM17.25 20.25C17.25 20.4489 17.171 20.6397 17.0303 20.7803C16.8897 20.921 16.6989 21 16.5 21H15.75V6H17.25V20.25ZM21 6C21 6.19891 20.921 6.38968 20.7803 6.53033C20.6397 6.67098 20.4489 6.75 20.25 6.75H18.75V5.25C18.75 5.05109 18.671 4.86032 18.5303 4.71967C18.3897 4.57902 18.1989 4.5 18 4.5H6C5.80109 4.5 5.61032 4.57902 5.46967 4.71967C5.32902 4.86032 5.25 5.05109 5.25 5.25V6.75H3.75C3.55109 6.75 3.36032 6.67098 3.21967 6.53033C3.07902 6.38968 3 6.19891 3 6V3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H20.25C20.4489 3 20.6397 3.07902 20.7803 3.21967C20.921 3.36032 21 3.55109 21 3.75V6Z"
              fill="#200E32"
            />
            <path
              d="M9 17.25C8.80109 17.25 8.61032 17.329 8.46967 17.4697C8.32902 17.6103 8.25 17.8011 8.25 18V18.75C8.25 18.9489 8.32902 19.1397 8.46967 19.2803C8.61032 19.421 8.80109 19.5 9 19.5C9.19891 19.5 9.38968 19.421 9.53033 19.2803C9.67098 19.1397 9.75 18.9489 9.75 18.75V18C9.75 17.8011 9.67098 17.6103 9.53033 17.4697C9.38968 17.329 9.19891 17.25 9 17.25ZM9 14.25C8.80109 14.25 8.61032 14.329 8.46967 14.4697C8.32902 14.6103 8.25 14.8011 8.25 15V15.75C8.25 15.9489 8.32902 16.1397 8.46967 16.2803C8.61032 16.421 8.80109 16.5 9 16.5C9.19891 16.5 9.38968 16.421 9.53033 16.2803C9.67098 16.1397 9.75 15.9489 9.75 15.75V15C9.75 14.8011 9.67098 14.6103 9.53033 14.4697C9.38968 14.329 9.19891 14.25 9 14.25Z"
              fill="#200E32"
            />
          </svg>

          <div className="w-[120px] text-[#111111] text-base leading-none">Spending Account</div>
        </div>
        <div className="justify-end items-center gap-1 flex">
          <div className="text-center text-[#111111] text-base font-semibold">1,000</div>
          <div className="text-center text-[#111111]/60 text-base">USDC</div>
        </div>
      </div>
      <div className="h-10 px-4 py-2 bg-[#f7f6f0] rounded-lg border border-[#111111]/10 justify-between items-center flex">
        <div className="justify-start items-center gap-2 flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389"
              stroke="#200E32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.0491 11.6431H17.7371"
              stroke="#200E32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
              stroke="#200E32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.03601 7.53809H12.435"
              stroke="#200E32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="w-[120px] text-[#111111] text-base leading-none">Wallet Transfer</div>
        </div>
        <div className="justify-end items-center gap-1 flex">
          <div className="text-center text-[#111111]/60 text-base">Show QR Code</div>
        </div>
      </div>
    </div>
  );
};

export const Digit = ({ value, onClick, type }: { value?: string; onClick?: () => void; type?: string }) => {
  return (
    <div
      onClick={onClick}
      className={cn('flex-col justify-center items-center gap-3 flex', {
        'rounded-2xl bg-[#f3f3f7] h-[56px]': !type,
        'justify-self-center	rounded-full w-[72px] h-[72px] bg-gray-200': type === 'rounded',
      })}
    >
      {value ? (
        <div className="text-center text-black text-[28px]">{value}</div>
      ) : type !== 'rounded' ? (
        <svg width="116" height="56" viewBox="0 0 116 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="116" height="56" rx="16" fill="#F4F4F7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M55.8864 16.5C55.9199 16.5 55.9539 16.5001 55.9883 16.5001L64.7413 16.5001C65.5463 16.5 66.2107 16.5 66.7519 16.5443C67.314 16.5902 67.8307 16.6887 68.316 16.936C69.0686 17.3195 69.6806 17.9315 70.0641 18.6841C70.3114 19.1694 70.4099 19.6861 70.4558 20.2482C70.5001 20.7894 70.5 21.4538 70.5 22.2587V33.7414C70.5 34.5463 70.5001 35.2107 70.4558 35.7519C70.4099 36.314 70.3114 36.8307 70.0641 37.316C69.6806 38.0687 69.0686 38.6806 68.316 39.0641C67.8307 39.3114 67.314 39.4099 66.7519 39.4559C66.2107 39.5001 65.5463 39.5001 64.7414 39.5001H55.9883C55.9539 39.5001 55.9199 39.5001 55.8864 39.5001C55.2514 39.5004 54.7716 39.5006 54.3089 39.3895C53.9007 39.2916 53.5106 39.1299 53.1527 38.9106C52.747 38.662 52.4079 38.3226 51.9591 37.8734C51.9354 37.8496 51.9114 37.8256 51.887 37.8013L46.1578 32.0721C45.5886 31.5029 45.1188 31.0331 44.7674 30.6192C44.4024 30.1892 44.1068 29.7542 43.9384 29.2361C43.6774 28.4328 43.6774 27.5674 43.9384 26.764C44.1068 26.2459 44.4024 25.8109 44.7674 25.381C45.1188 24.967 45.5886 24.4972 46.1578 23.9281L51.887 18.1988C51.9114 18.1745 51.9354 18.1505 51.9591 18.1268C52.4079 17.6776 52.747 17.3381 53.1527 17.0895C53.5106 16.8702 53.9007 16.7086 54.3089 16.6106C54.7716 16.4995 55.2514 16.4997 55.8864 16.5ZM55.9883 18.5001C55.2069 18.5001 54.9792 18.5065 54.7758 18.5553C54.5717 18.6043 54.3766 18.6851 54.1977 18.7948C54.0193 18.9041 53.8538 19.0605 53.3013 19.6131L47.6013 25.3131C46.9956 25.9188 46.5844 26.331 46.2921 26.6753C46.0074 27.0106 45.8948 27.2151 45.8406 27.382C45.71 27.7837 45.71 28.2164 45.8406 28.6181C45.8948 28.785 46.0074 28.9895 46.2921 29.3248C46.5844 29.6691 46.9956 30.0814 47.6013 30.6871L53.3013 36.3871C53.8538 36.9396 54.0193 37.096 54.1977 37.2053C54.3766 37.315 54.5717 37.3958 54.7758 37.4448C54.9792 37.4936 55.2069 37.5001 55.9883 37.5001H64.7C65.5566 37.5001 66.1389 37.4993 66.589 37.4625C67.0274 37.4267 67.2516 37.3618 67.408 37.2821C67.7843 37.0903 68.0903 36.7844 68.282 36.408C68.3617 36.2516 68.4267 36.0274 68.4625 35.589C68.4993 35.1389 68.5 34.5566 68.5 33.7001V22.3001C68.5 21.4435 68.4993 20.8612 68.4625 20.4111C68.4267 19.9727 68.3617 19.7485 68.282 19.5921C68.0903 19.2158 67.7843 18.9098 67.408 18.7181C67.2516 18.6384 67.0274 18.5734 66.589 18.5376C66.1389 18.5008 65.5566 18.5001 64.7 18.5001H55.9883ZM54.7929 23.293C55.1835 22.9024 55.8166 22.9024 56.2071 23.293L59.5 26.5858L62.7929 23.293C63.1835 22.9024 63.8166 22.9024 64.2071 23.293C64.5977 23.6835 64.5977 24.3166 64.2071 24.7072L60.9142 28.0001L64.2071 31.293C64.5977 31.6835 64.5977 32.3166 64.2071 32.7072C63.8166 33.0977 63.1835 33.0977 62.7929 32.7072L59.5 29.4143L56.2071 32.7072C55.8166 33.0977 55.1835 33.0977 54.7929 32.7072C54.4024 32.3166 54.4024 31.6835 54.7929 31.293L58.0858 28.0001L54.7929 24.7072C54.4024 24.3166 54.4024 23.6835 54.7929 23.293Z"
            fill="#007AFF"
          />
        </svg>
      ) : (
        <X />
      )}
    </div>
  );
};

export const Deposit = () => {
  const [openedModal, setOpenedModal] = useAtom(openedModalAtom);
  const [menuOpened, setMenuOpened] = useState(false);

  const [value, setValue] = useAtom(depositValueAtom);

  const userFriendlyAddress = useTonAddress();
  const { balance, walletAddress } = useJettonBalance(userFriendlyAddress);

  const router = useRouter();

  const handleTransfer = useTransfer();

  const handleDeposit = async () => {
    try {
      const result = await handleTransfer(parseInt(value) * 10 ** 6);
      if (result) {
        router.push(`/tontgpwa/successful?address=${encodeURIComponent(result?.toString())}`);
        setOpenedModal(undefined);
        console.log('Deposited');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!openedModal) {
      setValue('0');
      setMenuOpened(false);
    }
  }, [openedModal, setValue]);

  return (
    <AnimatePresence>
      {openedModal === 'deposit' && (
        <AlertDialog open={true}>
          <AlertDialogPortal>
            <AlertDialogOverlay onClick={() => setOpenedModal(undefined)} />
            <motion.div
              className="bg-white absolute bottom-0 z-50 rounded-t-xl shadow-lg w-full"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center p-4 relative">
                <div className="items-center absolute left-4">
                  <div onClick={() => setOpenedModal(undefined)} className="text-[#007aff] text-base">
                    Cancel
                  </div>
                </div>
                <div className="text-center text-black text-base font-semibold">Deposit</div>
                <div className="absolute right-4">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.80001 14C3.80001 8.36665 8.36671 3.79995 14 3.79995C19.6333 3.79995 24.2 8.36665 24.2 14C24.2 19.6333 19.6333 24.2 14 24.2C8.36671 24.2 3.80001 19.6333 3.80001 14ZM14 2.19995C7.48305 2.19995 2.20001 7.48299 2.20001 14C2.20001 20.5169 7.48305 25.7999 14 25.7999C20.517 25.7999 25.8 20.5169 25.8 14C25.8 7.48299 20.517 2.19995 14 2.19995ZM14.0001 15.25C14.6904 15.25 15.2501 14.6903 15.2501 14C15.2501 13.3096 14.6904 12.75 14.0001 12.75C13.3097 12.75 12.7501 13.3096 12.7501 14C12.7501 14.6903 13.3097 15.25 14.0001 15.25ZM10.2501 14C10.2501 14.6903 9.69042 15.25 9.00006 15.25C8.30971 15.25 7.75006 14.6903 7.75006 14C7.75006 13.3096 8.30971 12.75 9.00006 12.75C9.69042 12.75 10.2501 13.3096 10.2501 14ZM19.0001 15.25C19.6904 15.25 20.2501 14.6903 20.2501 14C20.2501 13.3096 19.6904 12.75 19.0001 12.75C18.3097 12.75 17.7501 13.3096 17.7501 14C17.7501 14.6903 18.3097 15.25 19.0001 15.25Z"
                      fill="#007AFF"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col p-4">
                <div className="border-b flex-col">
                  <div className="text-[#111111] text-4xl font-bold ">{value}</div>
                </div>
                <div className="flex items-center mt-4 justify-between">
                  <div className="items-center gap-2 flex">
                    <div className="text-[#111111]/40 text-sm">Pay with </div>
                    <div className="items-center gap-1 flex">
                      <div className="text-[#111111] text-sm">Ton Wallet</div>
                    </div>
                  </div>
                  <div className="justify-end items-center gap-1 flex" onClick={() => setMenuOpened(!menuOpened)}>
                    <div className="text-[#007aff] text-sm">Change</div>
                    {menuOpened ? <ChevronUp className="text-[#007aff]" /> : <ChevronDown className="text-[#007aff]" />}
                  </div>
                </div>
                {menuOpened ? (
                  <Menu />
                ) : (
                  <div className="grid grid-cols-3 gap-3 mt-10">
                    <Digit onClick={() => setValue((val) => parseInt(val + '1').toString())} value="1" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '2').toString())} value="2" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '3').toString())} value="3" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '4').toString())} value="4" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '5').toString())} value="5" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '6').toString())} value="6" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '7').toString())} value="7" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '8').toString())} value="8" />
                    <Digit onClick={() => setValue((val) => parseInt(val + '9').toString())} value="9" />
                    <div />
                    <Digit onClick={() => setValue((val) => parseInt(val + '0').toString())} value="0" />
                    <Digit
                      onClick={() =>
                        setValue((val) => (val.slice(0, -1) ? parseInt(val.slice(0, -1)).toString() : '0'))
                      }
                    />
                  </div>
                )}
                <div
                  onClick={() => handleDeposit()}
                  className="mb-8 mt-4 m-2 h-[50px] px-6 bg-[#007aff] rounded-xl justify-center items-center flex"
                >
                  <div className="w-1.5 relative" />
                  <div className="text-center text-white text-lg font-semibold">Deposit & Save</div>
                  <div className="w-1 relative" />
                </div>
              </div>
            </motion.div>
          </AlertDialogPortal>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};
