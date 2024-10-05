'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

const ActivitesPage = () => {
  return (
    <>
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
        <div className="px-4 text-2xl font-medium">Activites</div>
      </div>
    </>
  );
};

export default ActivitesPage;
