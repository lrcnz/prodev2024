'use client';

import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';

import { userTokenAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';
import { Button } from '@/ui-components/Button';
import { ErrorAlert } from '@/ui-components/ErrorAlert';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const createWallet = async (data: { userId: string }) => {
  const res = await fetch('/api/createWallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
};

const Page = () => {
  const client = useAtomValue(w3sSDKAtom);
  const user = useAtomValue(userTokenAtom);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [walletCreated, setWalletCreated] = useState(false);

  const createWalletMutation = useMutation({
    mutationFn: createWallet,
  });

  const onSubmit = async () => {
    if (!user?.userId) return;
    if (!client.sdk || createWalletMutation.isPending) return;

    try {
      const res = await createWalletMutation.mutateAsync({ userId: user.userId });
      if (res.error) {
        setErrorMsg(res.error?.message || 'Unknown error');
      }

      if (res.result.challengeId) {
        setLoading(true);
        client.sdk.execute(res.result.challengeId, (err, res) => {
          console.log(err, res);
          if (err) {
            setLoading(false);
            console.error(err);
            setErrorMsg(err?.message || 'Unknown error');
            return;
          }
          setLoading(false);
          Toast.show({
            content: 'Arbitrum wallet Created Successfully',
            icon: 'success',
          });
          setWalletCreated(true);
        });
      } else {
        Toast.show({
          content: 'Unknown error',
          icon: 'fail',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Loading open={createWalletMutation.isPending || loading} />
      <ErrorAlert message={errorMsg} open={!!errorMsg} onClose={() => setErrorMsg(null)} />
      <div className="flex flex-col h-full">
        <div className="flex justify-center flex-col items-center flex-1">
          <div>
            <CircleCheck color="#ffffff" fill="#0073C3" size="96" />
          </div>
          <div className="text-2xl font-semibold mt-4">Account Created Successfully</div>
          <div className="mt-1 mx-8 text-center text-muted-foreground">
            Your saving account is now active and ready to use.
          </div>
          <div className="mt-4 w-full p-4 flex flex-col justify-center items-center">
            <div className="text-xs text-muted-foreground">Create Arbitrum wallet</div>
            <div>
              {walletCreated ? (
                <Button className="mt-1 rounded min-w-48 bg-primary/50 hover:bg-primary/50">Done</Button>
              ) : (
                <Button onClick={onSubmit} className="mt-1 rounded min-w-48">
                  Create
                </Button>
              )}
            </div>
            <div>
              {walletCreated ? (
                <Button className="mt-4 rounded min-w-48" asChild>
                  <Link href="/selectplan">Next</Link>
                </Button>
              ) : (
                <Button className="mt-4 rounded min-w-48 bg-primary/50">Next</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
