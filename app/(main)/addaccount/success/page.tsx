'use client';

import { ArrowRight, CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui-components/Button';

const Page = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-center flex-col items-center flex-1">
          <div>
            <CircleCheck color="#ffffff" fill="#0073C3" size="96" />
          </div>
          <div className="text-2xl font-semibold mt-4">Created Successfully</div>
          <div className="mt-1 mx-8 text-center text-muted-foreground">
            Your saving account is now active and ready to use.
          </div>
          <div className="mt-4 p-4 ">
            <Button className="mt-4 rounded-full" asChild>
              <Link href="/selectplan">
                Continue
                <ArrowRight size="16" className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
