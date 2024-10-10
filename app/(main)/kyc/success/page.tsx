'use client';

import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui-components/Button';

const SuccessPage = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-center flex-col items-center flex-1">
          <div>
            <CircleCheck color="#ffffff" fill="#0073C3" size="96" />
          </div>
          <div className="text-2xl font-semibold mt-4">Verification Successful</div>
        </div>
        <div className="mt-auto p-4">
          <Button className="rounded-3xl h-12 w-full text-lg" asChild>
            <Link href="/">Got it</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
