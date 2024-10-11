'use client';

import { useSetAtom } from 'jotai';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import Passport from '@/assets/kyc/passport.png';
import { InnerHeader } from '@/components/InnerHeader';
import { useCurrentWallet } from '@/hooks/useWallet';
import { delay } from '@/lib/utils';
import { kycAtom } from '@/state/kyc';
import { Button } from '@/ui-components/Button';
import { Loading } from '@/ui-components/Loading';

const KYCPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setKyc = useSetAtom(kycAtom);
  const { data: wallet } = useCurrentWallet();

  const handleSubmit = async () => {
    if (!wallet?.address) return;
    setLoading(true);
    await delay(2000);
    setLoading(false);
    setKyc((result) => {
      return { ...result, [wallet.address]: true };
    });
    router.push('/kyc/success');
  };

  return (
    <>
      <Loading open={loading} />
      <div className="flex flex-col h-full">
        <InnerHeader title="Account Verification" />
        <div>
          <h2 className="bg-gray-100 px-4 py-3 text-gray-400">Name</h2>
          <div className="px-4">
            <div className="border-b py-3">
              <label className="text-gray-500">First Name</label>
              <div className="mt-1">Martin</div>
            </div>
            <div className="py-3">
              <label className="text-gray-500">Last Name</label>
              <div className="mt-1">Sarah</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="bg-gray-100 px-4 py-3 text-gray-400">Passport</h2>
          <div className="px-4">
            <div className="border-b py-3">
              <label className="text-gray-500">Passport Number</label>
              <div className="mt-1">P123456AA</div>
            </div>
            <div className="py-3">
              <label className="text-gray-500">Valid</label>
              <div className="mt-1">14/01/2033</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="bg-gray-100 px-4 py-3 text-gray-400">Others</h2>
          <div className="px-4">
            <div className="border-b py-3">
              <label className="text-gray-500">Date of Birth</label>
              <div className="mt-1">01/08/1990</div>
            </div>
            <div className="border-b py-3">
              <label className="text-gray-500">Gender</label>
              <div className="mt-1">Female</div>
            </div>
            <div className="border-b py-3">
              <label className="text-gray-500">Region</label>
              <div className="mt-1">Canada</div>
            </div>
            <div className="border-b py-3">
              <label className="text-gray-500">Upload Passport</label>
              <div className="flex gap-3 mt-3">
                <div className="relative overflow-visible">
                  <div className="w-20 h-20 rounded bg-gray-100 flex justify-center items-center text-gray-400 overflow-hidden">
                    <Image className="object-cover max-w-none" src={Passport} height={80} alt="passport font" />
                  </div>
                  <div className="flex justify-center items-center absolute w-5 h-5 rounded-full bg-gray-400 text-white -top-2 -right-2">
                    <X size={16} />
                  </div>
                </div>
                <div className="w-20 h-20 rounded bg-gray-100 flex justify-center items-center text-gray-400 overflow-hidden">
                  <Plus size={32} strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mt-2 pb-10">
          <Button className="w-full h-10 rounded-xl" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default KYCPage;
