'use client';
import { ChevronLeft, TrendingUp, Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Footer } from '../../components/Footer';

export default function SuperGrowth() {
  const handleSelectContact = async () => {
    if (typeof window === 'undefined') return;
    (window as any).Telegram.WebApp.switchInlineQuery(`share ${btoa(`earn`)}`, ['groups', 'channels', 'users', 'bots']);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-6 max-w-md bg-white rounded-lg">
        <div className="mt-8 mb-6">
          <div className="h-11 flex-col flex">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold flex items-center">My Referrals</div>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-6 mt-1" />
        </div>

        <div className="space-y-4 mt-4">
          {/* Bitcoin + Yield Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="24" fill="url(#paint0_radial_1333_9078)" />
                  <path
                    d="M14.4 11.1992C12.6333 11.1992 11.2 12.6322 11.2 14.3992C11.2 16.1663 12.6333 17.5992 14.4 17.5992C16.1667 17.5992 17.6 16.1663 17.6 14.3992C17.6 12.6322 16.1667 11.1992 14.4 11.1992ZM14.4 15.4661C13.8103 15.4661 13.3335 14.9883 13.3335 14.3992C13.3335 13.8101 13.8103 13.3323 14.4 13.3323C14.9898 13.3323 15.4666 13.8101 15.4666 14.3992C15.4666 14.9883 14.9898 15.4661 14.4 15.4661ZM24 20.7992C22.2333 20.7992 20.8 22.2322 20.8 23.9992C20.8 25.7659 22.2333 27.1992 24 27.1992C25.7667 27.1992 27.2 25.7659 27.2 23.9992C27.2 22.2322 25.7667 20.7992 24 20.7992ZM24 25.0661C23.4103 25.0661 22.9335 24.5883 22.9335 23.9992C22.9335 23.4101 23.4103 22.9323 24 22.9323C24.5898 22.9323 25.0666 23.4101 25.0666 23.9992C25.0666 24.5883 24.5898 25.0661 24 25.0661Z"
                    fill="white"
                  />
                  <path
                    d="M25.6914 11.1996L11.2002 25.6914L12.7086 27.1997L27.1998 12.708L25.6914 11.1996Z"
                    fill="white"
                  />
                  <path
                    d="M27.6416 19.7353L30.3991 16.9779V36.8009H32.5322V16.976L35.2915 19.7353L36.8 18.2272L32.2208 13.6477C31.8029 13.2288 31.128 13.2301 30.7114 13.6477L26.1322 18.2272L27.6416 19.7353Z"
                    fill="white"
                  />
                  <path d="M21.8666 30.4004H11.2V32.5338H21.8666V30.4004Z" fill="white" />
                  <path d="M17.6 34.666H11.2V36.7995H17.6V34.666Z" fill="white" />
                  <defs>
                    <radialGradient
                      id="paint0_radial_1333_9078"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(24 24) rotate(90) scale(24)"
                    >
                      <stop stopColor="#98C9FF" />
                      <stop offset="1" stopColor="#45B6B4" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Super Growth</div>
                <div className="text-gray-500 text-sm">
                  <span className="bg-gray-200 text-gray-500 text-[10px] px-1 py-0.5 rounded-lg font-semibold mr-1">
                    1.2%
                  </span>
                  Crypto Income Fund
                </div>
              </div>
            </div>

            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-500">112 Referred</span>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-2" />

          {/* Stable Saving Item */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 16C0 10.3995 0 7.59921 1.08993 5.46009C2.04867 3.57847 3.57847 2.04867 5.46009 1.08993C7.59921 0 10.3995 0 16 0H32C37.6005 0 40.4008 0 42.5399 1.08993C44.4215 2.04867 45.9513 3.57847 46.9101 5.46009C48 7.59921 48 10.3995 48 16V32C48 37.6005 48 40.4008 46.9101 42.5399C45.9513 44.4215 44.4215 45.9513 42.5399 46.9101C40.4008 48 37.6005 48 32 48H16C10.3995 48 7.59921 48 5.46009 46.9101C3.57847 45.9513 2.04867 44.4215 1.08993 42.5399C0 40.4008 0 37.6005 0 32V16Z"
                    fill="url(#paint0_radial_384_22802)"
                  />
                  <g clipPath="url(#clip0_384_22802)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.9219 20.5802C19.5421 20.9793 19.4286 21.3124 19.4286 21.5717C19.4286 21.831 19.5421 22.1641 19.9219 22.5632C20.3073 22.9683 20.9191 23.385 21.7625 23.7598C23.4464 24.5082 25.8527 25.0003 28.5714 25.0003C31.2901 25.0003 33.6965 24.5082 35.3804 23.7598C36.2237 23.385 36.8355 22.9683 37.221 22.5632C37.6008 22.1641 37.7143 21.831 37.7143 21.5717C37.7143 21.3124 37.6008 20.9793 37.221 20.5802C36.8355 20.1751 36.2237 19.7584 35.3804 19.3836C33.6965 18.6352 31.2901 18.1431 28.5714 18.1431C25.8527 18.1431 23.4464 18.6352 21.7625 19.3836C20.9191 19.7584 20.3073 20.1751 19.9219 20.5802ZM20.8342 17.2949C22.873 16.3887 25.6095 15.8574 28.5714 15.8574C31.5334 15.8574 34.2699 16.3887 36.3087 17.2949C37.3266 17.7473 38.2212 18.3156 38.8767 19.0044C39.5378 19.6991 40 20.5687 40 21.5717C40 22.5748 39.5378 23.4443 38.8767 24.139C38.2212 24.8278 37.3266 25.3961 36.3087 25.8486C34.2699 26.7547 31.5334 27.286 28.5714 27.286C25.6095 27.286 22.873 26.7547 20.8342 25.8486C19.8162 25.3961 18.9217 24.8278 18.2661 24.139C17.605 23.4443 17.1429 22.5748 17.1429 21.5717C17.1429 20.5687 17.605 19.6991 18.2661 19.0044C18.9217 18.3156 19.8162 17.7473 20.8342 17.2949Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.2857 20.4297C18.9169 20.4297 19.4286 20.9414 19.4286 21.5725V35.2868C19.4286 35.545 19.5413 35.8773 19.9188 36.2757C20.3019 36.6799 20.9105 37.0966 21.7514 37.4717C23.4302 38.2208 25.8359 38.7154 28.5714 38.7154C31.3069 38.7154 33.7126 38.2208 35.3915 37.4717C36.2323 37.0966 36.841 36.6799 37.2241 36.2757C37.6016 35.8773 37.7143 35.545 37.7143 35.2868V21.5725C37.7143 20.9414 38.226 20.4297 38.8571 20.4297C39.4883 20.4297 40 20.9414 40 21.5725V35.2868C40 36.2858 39.5413 37.1535 38.8831 37.848C38.2304 38.5366 37.3391 39.1057 36.3228 39.5591C34.2874 40.4672 31.5502 41.0011 28.5714 41.0011C25.5926 41.0011 22.8555 40.4672 20.8201 39.5591C19.8038 39.1057 18.9124 38.5366 18.2598 37.848C17.6016 37.1535 17.1429 36.2858 17.1429 35.2868V21.5725C17.1429 20.9414 17.6545 20.4297 18.2857 20.4297Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.2857 27.2852C18.9169 27.2852 19.4286 27.7968 19.4286 28.428C19.4286 28.6862 19.5413 29.0185 19.9188 29.4169C20.3019 29.8211 20.9105 30.2377 21.7514 30.6129C23.4302 31.3619 25.8359 31.8566 28.5714 31.8566C31.3069 31.8566 33.7126 31.3619 35.3915 30.6129C36.2323 30.2377 36.841 29.8211 37.2241 29.4169C37.6016 29.0185 37.7143 28.6862 37.7143 28.428C37.7143 27.7968 38.226 27.2852 38.8571 27.2852C39.4883 27.2852 40 27.7968 40 28.428C40 29.427 39.5413 30.2947 38.8831 30.9892C38.2304 31.6778 37.3391 32.2469 36.3228 32.7003C34.2874 33.6084 31.5502 34.1423 28.5714 34.1423C25.5926 34.1423 22.8555 33.6084 20.8201 32.7003C19.8038 32.2469 18.9124 31.6778 18.2598 30.9892C17.6016 30.2947 17.1429 29.427 17.1429 28.428C17.1429 27.7968 17.6545 27.2852 18.2857 27.2852Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.3996 9.00055C22.7557 8.83544 26.0832 9.69164 28.9431 11.4565C29.4802 11.788 29.6469 12.4922 29.3154 13.0293C28.9839 13.5664 28.2798 13.7331 27.7427 13.4017C25.269 11.8751 22.3897 11.1368 19.4867 11.2848C19.4674 11.2858 19.448 11.2862 19.4286 11.2862C16.7051 11.2862 14.299 11.7807 12.6165 12.5302C11.7738 12.9056 11.1627 13.3226 10.7778 13.7274C10.3982 14.1265 10.2857 14.4584 10.2857 14.7148C10.2857 14.9867 10.4146 15.3498 10.8668 15.7912C11.3226 16.236 12.0385 16.6867 13.0077 17.0871C13.5911 17.328 13.8687 17.9963 13.6277 18.5797C13.3868 19.1631 12.7185 19.4406 12.1351 19.1997C11.0015 18.7315 10.0031 18.1422 9.27034 17.427C8.534 16.7084 8 15.7915 8 14.7148C8 13.7141 8.46176 12.846 9.12148 12.1522C9.77585 11.4641 10.6691 10.8955 11.6864 10.4423C13.7173 9.53758 16.4429 9.004 19.3996 9.00055Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.14286 13.5723C9.77404 13.5723 10.2857 14.0839 10.2857 14.7151V28.4294C10.2857 28.7013 10.4146 29.0644 10.8668 29.5058C11.3226 29.9506 12.0385 30.4013 13.0077 30.8017C13.5911 31.0426 13.8687 31.7109 13.6277 32.2943C13.3868 32.8777 12.7185 33.1552 12.1351 32.9143C11.0015 32.446 10.0031 31.8568 9.27034 31.1416C8.534 30.4229 8 29.5061 8 28.4294V14.7151C8 14.0839 8.51167 13.5723 9.14286 13.5723Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.14286 20.4297C9.77404 20.4297 10.2857 20.9414 10.2857 21.5725C10.2857 21.8444 10.4146 22.2076 10.8668 22.6489C11.3226 23.0938 12.0385 23.5445 13.0077 23.9448C13.5911 24.1858 13.8687 24.854 13.6277 25.4374C13.3868 26.0208 12.7185 26.2984 12.1351 26.0574C11.0015 25.5892 10.0031 24.9999 9.27034 24.2847C8.534 23.5661 8 22.6493 8 21.5725C8 20.9414 8.51167 20.4297 9.14286 20.4297Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <radialGradient
                      id="paint0_radial_384_22802"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(24 24) rotate(90) scale(24)"
                    >
                      <stop stopColor="#DCE35B" />
                      <stop offset="1" stopColor="#45B649" />
                    </radialGradient>
                    <clipPath id="clip0_384_22802">
                      <rect width="32" height="32" fill="white" transform="translate(8 9)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Super Saving</div>
                <div className="text-gray-500 text-sm">
                  <span className="bg-gray-200 text-gray-500 text-[10px] px-1 py-0.5 rounded-lg font-semibold mr-1">
                    3.2%
                  </span>
                  Safe Heaven
                </div>
              </div>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-500">21 Referred</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gray-200 my-2" />

        {/* Earnings Section */}
        <h2 className="text-xl font-bold mt-6">My Earnings</h2>
        <div className="h-px bg-gray-200 mt-1 mb-5" />
        <div className="bg-[#e6e6ea] p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$2,315.5</span>
            <div className="text-sm text-[#007AFF]">
              <div className="font-semibold">+5</div>
              <div>Yesterday</div>
            </div>
          </div>
        </div>
      </div>
      <Footer active="send" />
    </div>
  );
}
