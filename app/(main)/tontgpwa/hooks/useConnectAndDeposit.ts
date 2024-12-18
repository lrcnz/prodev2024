import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useSetAtom } from 'jotai';

import { useCallback } from 'react';

import { openedModalAtom } from '@/state/modal';

export const useConnectAndDeposit = () => {
  const [tonConnectUI] = useTonConnectUI();
  const setOpenedModal = useSetAtom(openedModalAtom);
  // setOpenedModal('deposit')
  const userFriendlyAddress = useTonAddress();

  return useCallback(() => {
    if (!userFriendlyAddress) {
      tonConnectUI.openModal();
      const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
        if (wallet) {
          setOpenedModal('deposit');
          unsubscribe();
        }
      });
    } else {
      setOpenedModal('deposit');
    }
  }, [setOpenedModal, tonConnectUI, userFriendlyAddress]);
};
