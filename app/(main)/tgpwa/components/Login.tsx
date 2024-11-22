'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';

import { useCallback, useEffect, useState } from 'react';

import FaceIdKeyIcon from '../assets/faceidkey.svg';
import GoogleIcon from '../assets/google.png';
import PasskeyIcon from '../assets/passkey.png';

import { Deposit } from './Deposit';

import { openedModalAtom } from '@/state/modal';
import { AlertDialog, AlertDialogOverlay, AlertDialogPortal } from '@/ui-components/AlertDialog';

const FaceIdVerfiy = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 1500);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center w-full pt-3">
      <div className="w-[250px] h-[250px]">
        {!checked && (
          <svg width="250" height="229" viewBox="0 0 250 229" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd_384_22802)">
              <rect x="50" y="9" width="150" height="150" rx="42" fill="black" shapeRendering="crispEdges" />
            </g>
            <path
              d="M93.5 73.5586C92.0703 73.5586 91.3555 72.8203 91.3555 71.3438V62.3086C91.3555 58.9102 92.2227 56.3555 93.957 54.6445C95.6914 52.9336 98.2695 52.0781 101.691 52.0781H110.727C112.203 52.0781 112.941 52.793 112.941 54.2227C112.941 55.6758 112.203 56.4023 110.727 56.4023H101.797C99.8047 56.4023 98.2812 56.918 97.2266 57.9492C96.1953 58.9805 95.6797 60.5156 95.6797 62.5547V71.3438C95.6797 72.8203 94.9531 73.5586 93.5 73.5586ZM156.43 73.5586C155 73.5586 154.285 72.8203 154.285 71.3438V62.5547C154.285 60.5156 153.746 58.9805 152.668 57.9492C151.59 56.918 150.078 56.4023 148.133 56.4023H139.238C137.762 56.4023 137.023 55.6758 137.023 54.2227C137.023 52.793 137.762 52.0781 139.238 52.0781H148.238C151.684 52.0781 154.273 52.9453 156.008 54.6797C157.742 56.3906 158.609 58.9336 158.609 62.3086V71.3438C158.609 72.8203 157.883 73.5586 156.43 73.5586ZM101.691 119.297C98.2695 119.297 95.6914 118.43 93.957 116.695C92.2227 114.984 91.3555 112.43 91.3555 109.031V100.031C91.3555 98.5547 92.0703 97.8164 93.5 97.8164C94.9531 97.8164 95.6797 98.5547 95.6797 100.031V108.82C95.6797 110.859 96.1953 112.395 97.2266 113.426C98.2812 114.457 99.8047 114.973 101.797 114.973H110.727C112.203 114.973 112.941 115.699 112.941 117.152C112.941 118.582 112.203 119.297 110.727 119.297H101.691ZM139.238 119.297C137.762 119.297 137.023 118.582 137.023 117.152C137.023 115.699 137.762 114.973 139.238 114.973H148.133C150.078 114.973 151.59 114.457 152.668 113.426C153.746 112.395 154.285 110.859 154.285 108.82V100.031C154.285 98.5547 155 97.8164 156.43 97.8164C157.883 97.8164 158.609 98.5547 158.609 100.031V109.031C158.609 112.43 157.742 114.984 156.008 116.695C154.273 118.43 151.684 119.297 148.238 119.297H139.238ZM111.922 82.875C111.242 82.875 110.68 82.6641 110.234 82.2422C109.812 81.8203 109.602 81.2461 109.602 80.5195V75.7734C109.602 75.0703 109.812 74.5078 110.234 74.0859C110.68 73.6406 111.242 73.418 111.922 73.418C112.602 73.418 113.164 73.6406 113.609 74.0859C114.055 74.5078 114.277 75.0703 114.277 75.7734V80.5195C114.277 81.2461 114.055 81.8203 113.609 82.2422C113.164 82.6641 112.602 82.875 111.922 82.875ZM122.117 91.1016C121.391 91.1016 120.828 90.9375 120.43 90.6094C120.031 90.2578 119.832 89.7891 119.832 89.2031C119.832 88.6875 119.996 88.2656 120.324 87.9375C120.676 87.5859 121.109 87.4102 121.625 87.4102H122.82C123.078 87.4102 123.301 87.3281 123.488 87.1641C123.699 87 123.805 86.7539 123.805 86.4258V75.1758C123.805 74.6133 123.969 74.1797 124.297 73.875C124.625 73.5469 125.059 73.3828 125.598 73.3828C126.16 73.3828 126.605 73.5469 126.934 73.875C127.262 74.1797 127.426 74.6133 127.426 75.1758V86.1094C127.426 87.75 127.004 88.9922 126.16 89.8359C125.316 90.6797 124.074 91.1016 122.434 91.1016C122.387 91.1016 122.328 91.1016 122.258 91.1016C122.211 91.1016 122.164 91.1016 122.117 91.1016ZM137.832 82.875C137.129 82.875 136.566 82.6641 136.145 82.2422C135.723 81.8203 135.512 81.2461 135.512 80.5195V75.7734C135.512 75.0703 135.723 74.5078 136.145 74.0859C136.566 73.6406 137.129 73.418 137.832 73.418C138.512 73.418 139.062 73.6406 139.484 74.0859C139.93 74.5078 140.152 75.0703 140.152 75.7734V80.5195C140.152 81.2461 139.93 81.8203 139.484 82.2422C139.062 82.6641 138.512 82.875 137.832 82.875ZM124.719 102.457C122.68 102.457 120.664 102.059 118.672 101.262C116.68 100.441 114.992 99.2578 113.609 97.7109C113.422 97.5234 113.27 97.3242 113.152 97.1133C113.059 96.8789 113.012 96.6328 113.012 96.375C113.012 95.8359 113.188 95.4023 113.539 95.0742C113.891 94.7461 114.324 94.582 114.84 94.582C115.168 94.582 115.438 94.6523 115.648 94.793C115.883 94.9336 116.129 95.1211 116.387 95.3555C117.418 96.4102 118.684 97.2539 120.184 97.8867C121.684 98.5195 123.195 98.8359 124.719 98.8359C126.336 98.8359 127.883 98.5195 129.359 97.8867C130.859 97.2305 132.113 96.3867 133.121 95.3555C133.613 94.8398 134.117 94.582 134.633 94.582C135.125 94.582 135.547 94.7461 135.898 95.0742C136.25 95.4023 136.426 95.8359 136.426 96.375C136.426 96.6797 136.379 96.9492 136.285 97.1836C136.191 97.3945 136.062 97.582 135.898 97.7461C134.398 99.2227 132.664 100.383 130.695 101.227C128.75 102.047 126.758 102.457 124.719 102.457Z"
              fill="#A1F293"
            />
            <defs>
              <filter
                id="filter0_dd_384_22802"
                x="0"
                y="-21"
                width="250"
                height="250"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="20" />
                <feGaussianBlur stdDeviation="25" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_384_22802" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_384_22802" />
                <feOffset />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 1 0" />
                <feBlend mode="lighten" in2="effect1_dropShadow_384_22802" result="effect2_dropShadow_384_22802" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_384_22802" result="shape" />
              </filter>
            </defs>
          </svg>
        )}

        {checked && (
          <svg width="250" height="229" viewBox="0 0 250 229" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd_384_22802)">
              <rect x="50" y="9" width="150" height="150" rx="42" fill="black" shapeRendering="crispEdges" />
            </g>
            <path
              d="M125 119.879C120.172 119.879 115.625 118.953 111.359 117.102C107.117 115.273 103.367 112.742 100.109 109.508C96.875 106.25 94.332 102.5 92.4805 98.2578C90.6523 93.9922 89.7383 89.4453 89.7383 84.6172C89.7383 79.7891 90.6523 75.2539 92.4805 71.0117C94.332 66.7461 96.875 62.9961 100.109 59.7617C103.344 56.5039 107.082 53.9609 111.324 52.1328C115.59 50.2812 120.137 49.3555 124.965 49.3555C129.793 49.3555 134.34 50.2812 138.605 52.1328C142.871 53.9609 146.621 56.5039 149.855 59.7617C153.09 62.9961 155.633 66.7461 157.484 71.0117C159.336 75.2539 160.262 79.7891 160.262 84.6172C160.262 89.4453 159.336 93.9922 157.484 98.2578C155.633 102.5 153.09 106.25 149.855 109.508C146.621 112.742 142.871 115.273 138.605 117.102C134.363 118.953 129.828 119.879 125 119.879ZM125 115.344C129.242 115.344 133.215 114.547 136.918 112.953C140.645 111.359 143.914 109.156 146.727 106.344C149.562 103.531 151.766 100.273 153.336 96.5703C154.93 92.8438 155.727 88.8594 155.727 84.6172C155.727 80.375 154.93 76.4023 153.336 72.6992C151.742 68.9727 149.539 65.7031 146.727 62.8906C143.914 60.0547 140.645 57.8516 136.918 56.2812C133.215 54.6875 129.23 53.8906 124.965 53.8906C120.723 53.8906 116.738 54.6875 113.012 56.2812C109.309 57.8516 106.051 60.0547 103.238 62.8906C100.449 65.7031 98.2578 68.9727 96.6641 72.6992C95.0938 76.4023 94.3086 80.375 94.3086 84.6172C94.3086 88.8594 95.0938 92.8438 96.6641 96.5703C98.2578 100.273 100.461 103.531 103.273 106.344C106.086 109.156 109.344 111.359 113.047 112.953C116.75 114.547 120.734 115.344 125 115.344ZM121.168 101.281C120.723 101.281 120.312 101.188 119.938 101C119.586 100.789 119.246 100.473 118.918 100.051L109.496 88.7656C109.074 88.1797 108.863 87.6172 108.863 87.0781C108.863 86.4922 109.062 85.9883 109.461 85.5664C109.883 85.1445 110.375 84.9336 110.938 84.9336C111.336 84.9336 111.688 85.0156 111.992 85.1797C112.32 85.3203 112.637 85.5898 112.941 85.9883L121.062 96.0078L136.988 70.8359C137.504 70.0391 138.137 69.6406 138.887 69.6406C139.449 69.6406 139.953 69.8281 140.398 70.2031C140.844 70.5781 141.066 71.0586 141.066 71.6445C141.066 71.9258 140.996 72.2188 140.855 72.5234C140.738 72.8047 140.598 73.0742 140.434 73.332L123.348 100.051C122.785 100.871 122.059 101.281 121.168 101.281Z"
              fill="#A1F293"
            />
            <defs>
              <filter
                id="filter0_dd_384_22802"
                x="0"
                y="-21"
                width="250"
                height="250"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="20" />
                <feGaussianBlur stdDeviation="25" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_384_22802" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_384_22802" />
                <feOffset />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 0 0.14902 0 0 0 1 0" />
                <feBlend mode="lighten" in2="effect1_dropShadow_384_22802" result="effect2_dropShadow_384_22802" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_384_22802" result="shape" />
              </filter>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
};

const FaceId = ({ onNext }: { onNext: () => void }) => {
  const [opened, setOpened] = useState(false);
  const [done, setDone] = useState(false);
  const setOpenedModal = useSetAtom(openedModalAtom);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setDone(true);
        setTimeout(() => {
          setOpened(false);
          setOpenedModal('deposit');
          onNext();
        }, 1500);
      }, 1500);
    }
  }, [onNext, opened, setOpenedModal]);

  return (
    <div className="px-4 flex flex-col gap-4 mt-4">
      <div>{opened && <FaceIdVerfiy />}</div>
      <div className="flex justify-center">
        <FaceIdKeyIcon />
      </div>
      <div className="text-center text-black text-sm px-2">
        Do you want to sign in to “www.tardis-money.com” with your saved passkey for “alixdaricewilliams@gmail.com”?
      </div>
      <div onClick={() => setOpened(true)} className="mt-8 flex justify-center items-center flex-col">
        {done ? (
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="23" cy="23" r="22.25" stroke="#1967FD" strokeWidth="1.5" />
            <path d="M13 23.2747L20.4066 32.25L31.25 15" stroke="#1967FD" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.7998 2C3.60075 2 2.00003 1.9998 2 14.6897"
              stroke="#0A84FF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            <path
              d="M14.7998 48.002C3.60075 48.002 2.00003 48.0021 2 35.3123"
              stroke="#0A84FF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            <path
              d="M35.2002 2C46.3992 2 48 1.9998 48 14.6897"
              stroke="#0A84FF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            <path
              d="M35.2002 48.002C46.3992 48.002 48 48.0021 48 35.3123"
              stroke="#0A84FF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            <path
              d="M14.8007 18.6543V22.2233M35.2004 18.6543V22.2233M26.0005 18.6543V27.3784C26.0005 28.3037 25.2805 30.1543 22.4006 30.1543M17.2007 35.706C18.0007 36.7635 20.7206 38.8784 25.2005 38.8784C29.6805 38.8784 32.1338 36.7635 32.8004 35.706"
              stroke="#0A84FF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
          </svg>
        )}
        <div className="mt-2 text-center text-black text-sm">{done ? 'Done' : 'Continue with Face ID'}</div>
      </div>
    </div>
  );
};

export const Login = () => {
  const [page, setPage] = useState<'login' | 'faceid' | 'deposit'>('login');
  const [openedModal, setOpenedModal] = useAtom(openedModalAtom);
  const onClose = () => {
    setOpenedModal(undefined);
    setPage('login');
  };

  const onDeposit = useCallback(() => {
    setPage('login');
  }, []);

  return (
    <AnimatePresence>
      {openedModal === 'login' && (
        <AlertDialog open={true}>
          <AlertDialogPortal>
            <AlertDialogOverlay onClick={onClose} />
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
                  <div onClick={onClose} className="text-[#007aff] text-base">
                    Cancel
                  </div>
                </div>
                <div className="text-center text-black text-base font-semibold">Sign in</div>
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
              {page === 'login' && (
                <div className="px-4 flex flex-col gap-4 mt-10">
                  <div
                    onClick={() => setPage('faceid')}
                    className="h-[50px] bg-black rounded-xl justify-center items-center gap-2 inline-flex"
                  >
                    <div className="text-center text-white w-7 text-[28px]">
                      <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.8691 6.07227C13.0697 6.07227 13.4115 6.10417 13.8945 6.16797C14.3776 6.23177 14.9062 6.41406 15.4805 6.71484C16.0638 7.00651 16.5924 7.49414 17.0664 8.17773C17.0391 8.20508 16.9069 8.30534 16.6699 8.47852C16.4329 8.64258 16.1686 8.88867 15.877 9.2168C15.5853 9.53581 15.3301 9.94596 15.1113 10.4473C14.8926 10.9395 14.7832 11.5273 14.7832 12.2109C14.7832 12.9948 14.9199 13.6602 15.1934 14.207C15.4759 14.7539 15.7995 15.196 16.1641 15.5332C16.5378 15.8613 16.8659 16.1029 17.1484 16.2578C17.4401 16.4128 17.5951 16.4948 17.6133 16.5039C17.6042 16.5404 17.4857 16.8639 17.2578 17.4746C17.0391 18.0853 16.6745 18.7643 16.1641 19.5117C15.7174 20.1589 15.2344 20.7559 14.7148 21.3027C14.2044 21.8496 13.5892 22.123 12.8691 22.123C12.3861 22.123 11.9896 22.0547 11.6797 21.918C11.3698 21.7721 11.0508 21.6309 10.7227 21.4941C10.3945 21.3483 9.95247 21.2754 9.39648 21.2754C8.85872 21.2754 8.40755 21.3483 8.04297 21.4941C7.6875 21.64 7.3457 21.7858 7.01758 21.9316C6.69857 22.0775 6.32031 22.1504 5.88281 22.1504C5.21745 22.1504 4.63411 21.8861 4.13281 21.3574C3.63151 20.8288 3.11654 20.1953 2.58789 19.457C1.97721 18.582 1.45312 17.5156 1.01562 16.2578C0.58724 14.9909 0.373047 13.7148 0.373047 12.4297C0.373047 11.0534 0.632812 9.90039 1.15234 8.9707C1.67188 8.0319 2.33724 7.32552 3.14844 6.85156C3.96875 6.36849 4.81641 6.12695 5.69141 6.12695C6.15625 6.12695 6.59375 6.20443 7.00391 6.35938C7.41406 6.50521 7.79688 6.6556 8.15234 6.81055C8.51693 6.96549 8.84505 7.04297 9.13672 7.04297C9.41927 7.04297 9.7474 6.96094 10.1211 6.79688C10.4948 6.63281 10.9141 6.47331 11.3789 6.31836C11.8438 6.1543 12.3405 6.07227 12.8691 6.07227ZM12.1172 4.33594C11.7617 4.76432 11.3151 5.12435 10.7773 5.41602C10.2396 5.69857 9.72917 5.83984 9.24609 5.83984C9.14583 5.83984 9.05013 5.83073 8.95898 5.8125C8.94987 5.78516 8.94076 5.73503 8.93164 5.66211C8.92253 5.58919 8.91797 5.51172 8.91797 5.42969C8.91797 4.88281 9.03646 4.35417 9.27344 3.84375C9.51042 3.32422 9.7793 2.89583 10.0801 2.55859C10.4629 2.10286 10.946 1.72461 11.5293 1.42383C12.1126 1.12305 12.6686 0.963542 13.1973 0.945312C13.2246 1.0638 13.2383 1.20508 13.2383 1.36914C13.2383 1.91602 13.1335 2.44922 12.9238 2.96875C12.7142 3.47917 12.4453 3.9349 12.1172 4.33594Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="w-[192px] text-white text-lg ">Continue with Apple</div>
                  </div>
                  <div className="h-[50px] bg-[#007aff] rounded-xl justify-center items-center gap-2 inline-flex">
                    <Image src={GoogleIcon} className="w-7 h-7 relative" alt="icon" />
                    <div className="w-[192px] text-white text-lg ">Continue with Google</div>
                  </div>
                  <div className="h-[50px] bg-[#007aff] rounded-xl justify-center items-center gap-2 inline-flex">
                    <Image src={PasskeyIcon} className="w-7 h-7 relative" alt="icon" />
                    <div className="w-[192px] text-white text-lg ">Continue with Passkeys</div>
                  </div>
                </div>
              )}
              {page === 'faceid' && <FaceId onNext={onDeposit} />}
              {page === 'deposit' && <Deposit />}
              <div className="text-center mt-10 mb-8">
                <span className="text-[#111111]/40 text-sm ">Don’t you have an account? </span>
                <span className="text-[#007aff] text-sm  ">Sign up</span>
              </div>
            </motion.div>
          </AlertDialogPortal>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};
