'use client';

import { Label } from '@radix-ui/react-label';

import { X } from 'lucide-react';

import Image from 'next/image';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useRef, useState } from 'react';

import ApplePayIcon from '@/assets/apple_pay.svg?url';
import { delay } from '@/lib/utils';
import { Button } from '@/ui-components/Button';
import { Checkbox } from '@/ui-components/Checkbox';
import { InputGroup } from '@/ui-components/InputGroup';
import { Loading } from '@/ui-components/Loading';
import { RadioGroup, RadioGroupItem } from '@/ui-components/RadioGroup';

const DepositPage = () => {
  const router = useRouter();
  const [depositMethod, setDepositMethod] = useState('applepay');
  const [applepayAmount, setApplepayAmount] = useState('0');
  const [kycChecked, setKycChecked] = useState(false);
  const [jurisdictionChecked, setJurisdictionChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const jurisdictionRef = useRef<HTMLButtonElement>(null);
  const kycRef = useRef<HTMLButtonElement>(null);
  const termsRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!jurisdictionChecked || !termsChecked) {
      return;
    }
    if (depositMethod === 'applepay') {
      if (!applepayAmount) return;
      setLoading(true);
      await delay(3000);
      setLoading(false);
      router.push('/deposit/success');
      return;
    }
    if (depositMethod === 'transfer') {
      router.push('/deposit/transfer');
      return;
    }
  };
  return (
    <>
      <Loading open={loading} />
      <div className="flex flex-col h-full">
        <header className="h-14 flex justify-center items-center ">
          <div className="text-lg font-semibold relative w-full flex items-center justify-center">
            <div className="absolute left-4">
              <Link href="/">
                <X />
              </Link>
            </div>
          </div>
        </header>
        <div className="px-4 text-2xl font-medium">Deposit Money</div>
        <div className="flex flex-col px-4 py-2">
          <div className="p-2">
            <RadioGroup
              value={depositMethod}
              onValueChange={(value) => {
                setApplepayAmount('');
                setKycChecked(false);
                setDepositMethod(value);
              }}
              className="text-lg gap-6"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applepay" id="r1" />
                  <Label htmlFor="r1">Onramp USDC with Apple Pay</Label>
                </div>
                {depositMethod === 'applepay' && (
                  <div className="mt-4">
                    <InputGroup
                      className="h-12 text-xl w-full font-medium"
                      value={applepayAmount}
                      onChange={(value) => setApplepayAmount(value)}
                      postfix="USDC"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfer" id="r2" />
                <Label htmlFor="r2">Transfer USDC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cctp" id="r3" />
                <Label htmlFor="r3">CCTP USDC</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mt-auto p-4">
          {applepayAmount && (
            <div className="p-4 border border-muted rounded-xl mb-4">
              <div className="flex justify-between font-medium">
                <div>Total you&apos;ll pay</div>
                <div>{applepayAmount} USD</div>
              </div>
            </div>
          )}
          <div className="space-y-2 mb-4">
            {depositMethod === 'applepay' && (
              <div
                onClick={() => setKycChecked(!jurisdictionChecked)}
                className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
              >
                <Checkbox ref={kycRef} checked={kycChecked} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  KYC requirements met
                </label>
              </div>
            )}
            <div
              onClick={() => setJurisdictionChecked(!jurisdictionChecked)}
              className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
            >
              <Checkbox ref={jurisdictionRef} checked={jurisdictionChecked} />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Jurisdiction, not a sanctioned person or reside in list of sanctioned country
              </label>
            </div>
            <div
              onClick={() => setTermsChecked(!termsChecked)}
              className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
            >
              <Checkbox ref={termsRef} checked={termsChecked} />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Agree toi terms and condition
              </label>
            </div>
          </div>
          <Button className="rounded-3xl h-12 w-full text-lg" onClick={onSubmit}>
            {depositMethod === 'applepay' ? <Image className="h-8" src={ApplePayIcon} alt="Apple Pay" /> : 'Continue'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DepositPage;
