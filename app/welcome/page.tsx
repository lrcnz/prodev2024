import Link from 'next/link';

import { Button } from '@/ui-components/Button';

const WelcomePage = () => {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="text-4xl uppercase font-semibold mt-12 px-4">Welcome</div>
      <div className="mt-auto mb-8 px-4">
        <div className="flex gap-4 w-full justify-between mt-12">
          <div className="flex-1">
            <Button className="w-full rounded-2xl h-12">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
          <div className="flex-1">
            <Button asChild className="w-full rounded-2xl h-12" variant="outline">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
