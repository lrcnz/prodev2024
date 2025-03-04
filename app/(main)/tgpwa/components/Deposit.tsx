'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useAtom } from 'jotai';

import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';
import { AlertDialog, AlertDialogOverlay, AlertDialogPortal } from '@/ui-components/AlertDialog';

const Menu = () => {
  return (
    <div className="flex flex-col gap-4 mt-6 mb-6">
      <div className="h-10 px-4 py-2 bg-[#f7f6f0] rounded-lg border-2 border-[#111111] justify-between items-center flex">
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
          <div className="text-center text-[#111111] text-base font-semibold">$4,000 </div>
          <div className="text-center text-[#111111]/60 text-base">USD</div>
        </div>
      </div>
      <div className="h-12 px-4 py-2 bg-[#f7f6f0] rounded-lg border border-[#111111]/10 justify-between items-center flex">
        <div className="justify-start items-center gap-2 flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.1286 13.6127C18.0593 13.5296 17.964 13.4723 17.858 13.4501C17.7521 13.428 17.6417 13.4423 17.5449 13.4908L12 16.2633L6.45503 13.4908C6.35833 13.4423 6.2481 13.428 6.14221 13.45C6.03631 13.4721 5.94097 13.5292 5.87163 13.6122C5.80229 13.6952 5.76301 13.7992 5.76018 13.9073C5.75734 14.0155 5.7911 14.1214 5.85599 14.2079L11.616 21.8879C11.6218 21.8956 11.6314 21.8985 11.6381 21.9062C11.6701 21.944 11.708 21.9764 11.7504 22.0022C11.7656 22.0139 11.7816 22.0245 11.7984 22.0338C11.8609 22.0654 11.93 22.0818 12 22.0818C12.07 22.0818 12.1391 22.0654 12.2016 22.0338C12.2184 22.0245 12.2344 22.0139 12.2496 22.0022C12.292 21.9764 12.3299 21.944 12.3619 21.9062C12.3686 21.8985 12.3782 21.8956 12.384 21.8879L18.144 14.2079C18.2088 14.1215 18.2425 14.0157 18.2397 13.9076C18.237 13.7996 18.1978 13.6957 18.1286 13.6127ZM11.52 17.0966V20.1599L7.84415 15.2639L11.52 17.0966ZM12.48 20.1599V17.0966L16.1558 15.2639L12.48 20.1599Z"
              fill="black"
            />
            <path
              d="M5.77345 12.0556C5.77298 12.082 5.77491 12.1084 5.77921 12.1344C5.78401 12.1497 5.79553 12.1612 5.80129 12.1756C5.80358 12.189 5.80679 12.2021 5.81089 12.215C5.81665 12.2275 5.83105 12.2323 5.83777 12.2438C5.86993 12.2971 5.91235 12.3434 5.96257 12.3801C5.97889 12.3916 5.99041 12.4051 6.00673 12.4147C6.02305 12.4243 6.01825 12.4262 6.02497 12.4291L11.785 15.3091H11.7984C11.8611 15.34 11.9301 15.3561 12 15.3561C12.0699 15.3561 12.1389 15.34 12.2016 15.3091H12.2151L17.9751 12.4291C17.9891 12.4194 18.0026 12.4088 18.0154 12.3974C18.0454 12.3786 18.0731 12.3564 18.0979 12.3312C18.1192 12.3095 18.1381 12.2857 18.1546 12.2601C18.1669 12.2457 18.1785 12.2307 18.1891 12.215C18.1959 12.2006 18.1949 12.1862 18.2007 12.1728C18.2081 12.1604 18.2148 12.1475 18.2208 12.1344C18.2222 12.1171 18.2222 12.0998 18.2208 12.0825C18.2276 12.0494 18.2302 12.0155 18.2285 11.9817C18.2274 11.9536 18.2239 11.9257 18.2179 11.8982C18.21 11.865 18.1985 11.8328 18.1834 11.8022C18.1793 11.7868 18.1741 11.7718 18.168 11.7571L12.408 2.15709C12.4013 2.14653 12.3888 2.14269 12.3821 2.13309C12.3401 2.06972 12.283 2.01774 12.216 1.98178C12.149 1.94582 12.0741 1.927 11.9981 1.927C11.922 1.927 11.8472 1.94582 11.7802 1.98178C11.7132 2.01774 11.6561 2.06972 11.6141 2.13309C11.6074 2.14269 11.5949 2.14653 11.5882 2.15709L5.82817 11.7571C5.78986 11.8252 5.76877 11.9017 5.76673 11.9798C5.76673 11.9884 5.76001 11.9952 5.76001 12.0038C5.7634 12.0213 5.76789 12.0387 5.77345 12.0556ZM11.52 14.1033L7.31329 12L11.52 9.89661V14.1033ZM12.48 9.89661L16.6867 12L12.48 14.1033V9.89661ZM12.48 8.82333V4.13277L16.4995 10.8326L12.48 8.82333ZM11.52 8.82333L7.49953 10.8336L11.52 4.13277V8.82333Z"
              fill="black"
            />
          </svg>

          <div className="w-[120px] text-[#111111] text-base leading-none">Balance on Etherum</div>
        </div>
        <div className="justify-end items-center gap-1 flex">
          <div className="text-center text-[#111111] text-base font-semibold">2,150</div>
          <div className="text-center text-[#111111]/60 text-base">USDT</div>
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
          <div className="text-center text-[#111111]/60 text-base">USDT</div>
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
              fill-rule="evenodd"
              clip-rule="evenodd"
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

  useEffect(() => {
    if (!openedModal) {
      setMenuOpened(false);
    }
  }, [openedModal]);

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
                  <div className="text-[#111111] text-4xl font-bold ">{1200}</div>
                </div>
                <div className="flex items-center mt-4 justify-between">
                  <div className="items-center gap-2 flex">
                    <div className="text-[#111111]/40 text-sm">Pay with </div>
                    <div className="items-center gap-1 flex">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.3981 4.55698C10.5221 4.55698 10.7336 4.57704 11.0325 4.61715C11.3314 4.65727 11.6584 4.77189 12.0137 4.96102C12.3746 5.14441 12.7017 5.45103 12.9949 5.88086C12.978 5.89805 12.8962 5.96109 12.7496 6.06998C12.603 6.17314 12.4395 6.32788 12.259 6.5342C12.0786 6.73478 11.9207 6.99268 11.7853 7.30789C11.65 7.61737 11.5823 7.98702 11.5823 8.41685C11.5823 8.90973 11.6669 9.32809 11.8361 9.67196C12.0109 10.0158 12.2111 10.2938 12.4366 10.5058C12.6679 10.7121 12.8709 10.864 13.0457 10.9614C13.2261 11.0589 13.322 11.1105 13.3333 11.1162C13.3277 11.1391 13.2543 11.3426 13.1134 11.7265C12.978 12.1105 12.7524 12.5375 12.4366 13.0074C12.1603 13.4143 11.8614 13.7897 11.54 14.1336C11.2242 14.4775 10.8436 14.6494 10.3981 14.6494C10.0992 14.6494 9.85387 14.6064 9.66213 14.5204C9.4704 14.4287 9.27302 14.3399 9.07001 14.2539C8.86699 14.1623 8.59349 14.1164 8.2495 14.1164C7.91678 14.1164 7.63764 14.1623 7.41207 14.2539C7.19213 14.3456 6.98066 14.4373 6.77765 14.529C6.58027 14.6207 6.34624 14.6666 6.07556 14.6666C5.66389 14.6666 5.30298 14.5004 4.99282 14.168C4.68266 13.8356 4.36404 13.4373 4.03697 12.9731C3.65914 12.4229 3.33488 11.7523 3.06419 10.9614C2.79915 10.1648 2.66663 9.36248 2.66663 8.5544C2.66663 7.68901 2.82734 6.96403 3.14878 6.37946C3.47022 5.78916 3.88189 5.345 4.38378 5.04698C4.89131 4.74324 5.41577 4.59136 5.95714 4.59136C6.24474 4.59136 6.51542 4.64008 6.76919 4.73751C7.02296 4.8292 7.2598 4.92377 7.47974 5.02119C7.70531 5.11862 7.90832 5.16734 8.08878 5.16734C8.26359 5.16734 8.46661 5.11576 8.69782 5.0126C8.92903 4.90944 9.18843 4.80915 9.47603 4.71172C9.76364 4.60856 10.071 4.55698 10.3981 4.55698ZM9.93282 3.46521C9.71288 3.73457 9.43656 3.96095 9.10384 4.14434C8.77113 4.322 8.45533 4.41084 8.15645 4.41084C8.09442 4.41084 8.0352 4.40511 7.97881 4.39364C7.97317 4.37645 7.96753 4.34493 7.96189 4.29908C7.95625 4.25323 7.95343 4.20452 7.95343 4.15294C7.95343 3.80907 8.02674 3.47667 8.17337 3.15573C8.31999 2.82906 8.48634 2.5597 8.67244 2.34765C8.90929 2.0611 9.20817 1.82326 9.56908 1.63413C9.93 1.44501 10.274 1.34471 10.6011 1.33325C10.618 1.40776 10.6264 1.49659 10.6264 1.59975C10.6264 1.94361 10.5616 2.27888 10.4319 2.60555C10.3022 2.92649 10.1358 3.21304 9.93282 3.46521Z"
                          fill="black"
                        />
                      </svg>
                      <div className="text-[#111111] text-sm">Apple Pay</div>
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
                    <Digit value="1" />
                    <Digit value="2" />
                    <Digit value="3" />
                    <Digit value="4" />
                    <Digit value="5" />
                    <Digit value="6" />
                    <Digit value="7" />
                    <Digit value="8" />
                    <Digit value="9" />
                    <div />
                    <Digit value="0" />
                    <Digit />
                  </div>
                )}
                <div
                  onClick={() => setOpenedModal('pay')}
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
