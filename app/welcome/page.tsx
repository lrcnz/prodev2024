import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui-components/Button';

const WelcomePage = () => {
  return (
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
      <div className="justify-center flex flex-col flex-1 mb-16">
        <div className="text-4xl uppercase font-semibold mt-12 px-4">Welcome to Tardis Money</div>
        <div className="mt-16 mb-8 px-4">
          <div className="flex gap-4 w-full justify-between mt-12">
            <div className="flex-1">
              <Button asChild className="w-full rounded-2xl h-12">
                <Link href="/addaccount">Sign up</Link>
              </Button>
            </div>
            <div className="flex-1">
              <Button asChild className="w-full rounded-2xl h-12" variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
