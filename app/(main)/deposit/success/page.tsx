'use client';

import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui-components/Button';

const DepositSuccessPage = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-center flex-col items-center flex-1">
          <div>
            <CircleCheck color="#ffffff" fill="#0073C3" size="96" />
          </div>
          <div className="text-2xl font-semibold mt-4">Successful</div>
          <div className="text-center text-sm mx-4 text-muted-foreground">
            Your funds have been deposited successfully.
          </div>
          <div className="text-muted-foreground text-center mx-6 mt-4 font-semibold">
            Note: Testnet balance may take a while to update, refresh to see the new balance
          </div>
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

export default DepositSuccessPage;
