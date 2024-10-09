import { Menu, Search } from 'lucide-react';
import Link from 'next/link';

export const AppHeader = () => {
  return (
    <header className="min-h-12 h-12 flex justify-center items-center border-b">
      <div className="text-lg font-semibold relative w-full flex items-center justify-center">
        <div className="absolute left-4">
          <Link href="/setting">
            <Menu />
          </Link>
        </div>
        <div className="absolute right-4">
          <Link href="/setting">
            <Search />
          </Link>
        </div>
        Tardis Money
      </div>
    </header>
  );
};
