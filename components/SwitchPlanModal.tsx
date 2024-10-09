import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { useAtom } from 'jotai';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import GrowthImg from '@/assets/earn/growth.png';
import SavingsImg from '@/assets/earn/savings.png';
import { useTransfer } from '@/hooks/useTransfer';
import { planAtom, switchPlanModalOpenedAtom } from '@/state/plan';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/ui-components/AlertDialog';

import { AlertDialogFooter, AlertDialogHeader } from '@/ui-components/AlertDialog';
import { Button } from '@/ui-components/Button';
import { Loading } from '@/ui-components/Loading';

export const SwitchPlanModal = () => {
  const [plan, setPlan] = useAtom(planAtom);
  const [opened, setModal] = useAtom(switchPlanModalOpenedAtom);
  const { switchPlan, loading } = useTransfer();

  const growth = (
    <div className="rounded-2xl bg-[#F7F9C6] flex flex-col px-4 py-6 justify-center items-center gap-1.5">
      <div>
        <Image className="h-8 w-8" alt="savings" src={SavingsImg} />
      </div>
      <div className="text-sm">Growth</div>
      <div className="text-sm font-semibold">7.73% APY</div>
    </div>
  );

  const savings = (
    <div className="rounded-2xl bg-[#E4F2F1] flex flex-col px-4 py-6 justify-center items-center gap-1.5">
      <div>
        <Image className="h-8 w-8" alt="growth" src={GrowthImg} />
      </div>
      <div className="text-sm">Savings</div>
      <div className="text-sm font-semibold">5.13% APY</div>
    </div>
  );

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = async () => {
    switchPlan(() => {
      setPlan(plan === 'growth' ? 'savings' : 'growth');
    });

    setModal(false);
  };

  return (
    <>
      <Loading open={loading} />
      <AlertDialog open={opened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <VisuallyHidden>
              <AlertDialogTitle>Switch Plan</AlertDialogTitle>
              <AlertDialogDescription>Confirm your new Earn plan</AlertDialogDescription>
            </VisuallyHidden>
          </AlertDialogHeader>
          <div className="flex justify-center items-center gap-8">
            {plan === 'growth' ? growth : savings}
            <div>
              <ArrowRight />
            </div>
            {plan === 'savings' ? growth : savings}
          </div>
          <div className="mt-3 text-center text-muted-foreground">Confirm your new Earn plan</div>
          <AlertDialogFooter>
            <Button variant="outline" className="mt-2" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>Confirm</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
