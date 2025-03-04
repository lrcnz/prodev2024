'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export const InnerHeader = ({ title }: { title: string }) => {
  return (
    <header className="min-h-12 h-12 flex justify-center items-center border-b">
      <div className="text-lg font-semibold relative w-full flex items-center justify-center">
        <div className="absolute left-4">
          <Link href="/">
            <ChevronLeft />
          </Link>
        </div>
        {title}
      </div>
    </header>
  );
};
