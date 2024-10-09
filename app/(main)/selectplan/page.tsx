'use client';

import { useSetAtom } from 'jotai';
import { ThumbsUp, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { EarnCard } from '@/components/EarnCard';
import { planAtom } from '@/state/plan';
import { Badge } from '@/ui-components/Badge';
import { Button } from '@/ui-components/Button';

const SelectplanPage = () => {
  const setPlan = useSetAtom(planAtom);
  const router = useRouter();

  const handleConfirm = async () => {
    setPlan('savings');
    router.push('/deposit?type=onboarding');
  };

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
        <div className="px-4 text-2xl font-medium">Select your earning plan</div>

        <div className="flex flex-col items-center p-4">
          <div className="space-y-2 mt-2 w-full">
            <EarnCard type="savings" selected={true} onClick={() => null}>
              <Badge variant="secondary" className="absolute top-2 right-2">
                <ThumbsUp width={14} height={14} className="mr-2" />
                Recommend
              </Badge>
            </EarnCard>
            <EarnCard type="growth" selected={false} onClick={() => null} />
          </div>
          <Button className="mt-16 h-10 rounded-xl w-full" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectplanPage;
