'use client';
import { AnimatePresence, motion } from 'framer-motion';

import { useAtom } from 'jotai';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Ring from '../assets/ring-resize.svg';

import { delay } from '@/lib/utils';
import { openedModalAtom } from '@/state/modal';
import { AlertDialog, AlertDialogOverlay, AlertDialogPortal } from '@/ui-components/AlertDialog';
import { Button } from '@/ui-components/Button';

export const TonWallet = () => {
  const [openedModal, setOpenedModal] = useAtom(openedModalAtom);
  const router = useRouter();
  useEffect(() => {
    if (openedModal === 'ton') {
      delay(1000).then(() => {
        setOpenedModal(undefined);
        router.push('/tontgpwa/tgwallet');
      });
    }
  }, [openedModal, router, setOpenedModal]);

  return (
    <AnimatePresence>
      {openedModal === 'ton' && (
        <AlertDialog open={true}>
          <AlertDialogPortal>
            <AlertDialogOverlay onClick={() => setOpenedModal(undefined)} />

            <motion.div
              className="absolute bottom-0 z-50 rounded-t-xl shadow-lg w-full bg-[#ebebeb]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center px-4 py-16 flex-col">
                <div className="h-16 w-16">
                  <Ring className="text-[#ccc]" />
                </div>
                <div className="text-2xl text-center font-semibold">
                  Confirm the transaction <br />
                  in wallet
                </div>
                <div className="text-gray-500">It will only take a monent</div>
                <Button className="mt-12 rounded-xl">Open Wallet</Button>
              </div>
            </motion.div>
          </AlertDialogPortal>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};
