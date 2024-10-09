'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CreateSaving01 from '@/assets/account/create_saving_01.png';
import CreateSaving02 from '@/assets/account/create_saving_02.png';
import CreateSaving03 from '@/assets/account/create_saving_03.png';
import { InnerHeader } from '@/components/InnerHeader';
import { cn } from '@/lib/utils';
import { Button } from '@/ui-components/Button';

const subTitle01 = 'Create Savings Account';
const subTitle02 = 'Find Your Account';
const subTitle03 = 'Earn Yield or Start Spending';

const content01 = 'Create your first USDC savings account';
const content02 = 'Use Apple Pay to found your account, receive USDC directly';
const content03 = 'Your USDC balance can be spend using Tardis Card, or participate in Earn programs';

const AddAccountPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [illustration, setIllustration] = useState(CreateSaving01);
  const [subTitle, setSubTitle] = useState(subTitle01);
  const [content, setContent] = useState(content01);

  useEffect(() => {
    if (step === 1) {
      setIllustration(CreateSaving01);
      setSubTitle(subTitle01);
      setContent(content01);
    }
    if (step === 2) {
      setIllustration(CreateSaving02);
      setSubTitle(subTitle02);
      setContent(content02);
    }
    if (step === 3) {
      setIllustration(CreateSaving03);
      setSubTitle(subTitle03);
      setContent(content03);
    }
  }, [step]);

  const activeDot = (dotStep: number) => ({
    'bg-gray-200': step !== dotStep,
    'w-1.5': step !== dotStep,
    'bg-secondary': step === dotStep,
    'w-7': step === dotStep,
  });

  const handleNext = () => (step === 3 ? router.push('/signup') : setStep(step + 1));

  return (
    <div className="flex flex-col h-full">
      <InnerHeader title="Create Savings Account" />
      <div className="flex mt-16 flex-col justify-center items-center">
        <div className="max-w-80">
          <Image src={illustration} alt="create saving account illustration" width={step === 4 ? '55' : undefined} />
        </div>
        <div className={cn('w-full text-center', { 'mt-5': step === 4 })}>
          <div className="text-base">{subTitle}</div>
          <div className="absolute left-0 right-0 pl-7 pr-7 mt-1 text-base text-gray-400 text-center">{content}</div>
        </div>
        <div className={cn('flex mt-20')}>
          <div className={cn('rounded-full h-1.5', { ...activeDot(1) })} />
          <div className={cn('rounded-full h-1.5 ml-1.5', { ...activeDot(2) })} />
          <div className={cn('rounded-full h-1.5 ml-1.5', { ...activeDot(3) })} />
        </div>
        <Button variant="primary" className="mt-16 rounded" onClick={handleNext}>
          Next
          <ArrowRight size="16" className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AddAccountPage;
