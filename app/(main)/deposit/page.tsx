'use client';

import { Label } from '@radix-ui/react-label';

import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Copy, X } from 'lucide-react';

import Image from 'next/image';

import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';

import { set } from 'react-hook-form';
import { formatUnits, parseUnits, type Address } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { usePublicClient, useReadContract } from 'wagmi';

import ApplePayIcon from '@/assets/apple_pay.svg?url';
import useCctp from '@/hooks/useCctp';
import { useTransfer } from '@/hooks/useTransfer';
import { useCurrentWallet } from '@/hooks/useWallet';
import { ERC20_ABI } from '@/lib/abis/erc20';
import { CHAIN_IDS_TO_USDC_ADDRESSES, getMessageBytesFromEventLogs, getMessageHashFromBytes } from '@/lib/cctp';
import { fetchUserChallengeTx, pollAttestations } from '@/lib/queries';
import { cn, delay, formatNumber } from '@/lib/utils';
import { userTokenAtom } from '@/state/userToken';
import { Button } from '@/ui-components/Button';
import { Checkbox } from '@/ui-components/Checkbox';
import { InputGroup } from '@/ui-components/InputGroup';
import { Loading } from '@/ui-components/Loading';
import { RadioGroup, RadioGroupItem } from '@/ui-components/RadioGroup';
import { Toast } from '@/ui-components/Toast';

const DepositPage = () => {
  const search = useSearchParams();
  const isOnBoarding = search.get('type') === 'onboarding';
  const router = useRouter();
  const arbPublicClient = usePublicClient({
    chainId: arbitrumSepolia.id,
  });

  const [depositMethod, setDepositMethod] = useState(isOnBoarding ? 'transfer' : 'applepay');
  const [applepayAmount, setApplepayAmount] = useState('');
  const [kycChecked, setKycChecked] = useState(false);
  const [jurisdictionChecked, setJurisdictionChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const jurisdictionRef = useRef<HTMLButtonElement>(null);
  const kycRef = useRef<HTMLButtonElement>(null);
  const termsRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const { data: wallet } = useCurrentWallet();
  const { transferToSavings, loading: transferLoading } = useTransfer(false);
  const [ccptAmount, setCcptAmount] = useState('');
  const [arbBalance, setArbBalance] = useState<bigint>();
  const { submitCctp, receiveCctp, loading: cctpLoading } = useCctp();
  const userToken = useAtomValue(userTokenAtom);
  const [cctpChallengeId, setCctpChallengeId] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);
  const [message, setMessage] = useState<any | null>(null);

  const {
    data: txData,
    error,
    isLoading: isTxLoading,
  } = useQuery({
    queryKey: ['userChallengeTx', cctpChallengeId],
    queryFn: () => {
      if (!userToken?.userToken) return;
      return fetchUserChallengeTx({
        challengeId: cctpChallengeId as string,
        userToken: userToken?.userToken,
      });
    },
    enabled: !!cctpChallengeId && !message,
    refetchInterval: 3000,
  });
  console.log('message', message);

  useEffect(() => {
    if (!arbPublicClient) return;
    if (txData) {
      if ((txData as any)?.txHash) {
        setCctpChallengeId(null);
        arbPublicClient
          .getTransactionReceipt({
            hash: (txData as any)?.txHash,
          })
          .then((tx) => {
            const messageBytes = getMessageBytesFromEventLogs(tx.logs, 'MessageSent(bytes)');
            const messageHash = getMessageHashFromBytes(messageBytes);
            return Promise.all([pollAttestations(messageHash), messageBytes]);
          })
          .then(([res, messageBytes]) => {
            setInProgress(false);
            console.log(res, messageBytes);
            if ((res as any).attestation) {
              setMessage({
                attestation: (res as any).attestation,
                messageBytes,
              });
            } else {
              Toast.show({
                content: 'Unkown error',
                icon: 'fail',
              });
            }
          })
          .catch((err) => {
            console.error(err);
            setInProgress(false);
          })
          .finally(() => {
            Toast.clear();
          });
      }
    }
  }, [txData]);

  useEffect(() => {
    if (inProgress) {
      console.log('cctp in progress');
      Toast.clear();
      Toast.show({
        content: 'CCTP in progress',
        duration: 0,
        icon: 'loading',
      });
    }
  }, [inProgress]);

  useEffect(() => {
    if (!wallet?.address) return;

    arbPublicClient
      ?.readContract({
        address: CHAIN_IDS_TO_USDC_ADDRESSES.ARB_SEPOLIA as Address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [wallet?.address as any],
      })
      .then((balance) => {
        setArbBalance(balance);
      });
  }, [arbPublicClient, wallet?.address]);

  const onSubmit = async () => {
    if (depositMethod !== 'transfer' && (!jurisdictionChecked || !termsChecked)) {
      return;
    }
    if (depositMethod === 'applepay') {
      if (!applepayAmount) return;
      setLoading(true);
      await delay(3000);
      setLoading(false);
      router.push('/deposit/success');
      return;
    }
    if (depositMethod === 'transfer') {
      await transferToSavings(() => {
        router.push('/deposit/success');
      });

      return;
    }
  };

  const onCctpSubmit = async () => {
    if (!ccptAmount) return;
    if (!userToken?.userToken) return;

    await submitCctp(
      async (id, err, res) => {
        console.log(id, err, res);
        if (id) {
          setCctpChallengeId(id);
          setInProgress(true);
        }
      },
      parseUnits(ccptAmount, 6)
    );
  };

  const onCctpRedeem = async () => {
    if (!ccptAmount) return;
    if (!userToken?.userToken) return;
    if (!message) return;

    await receiveCctp(
      async (err, res) => {
        setCcptAmount('');
        setMessage(null);
        router.push('/deposit/success');
      },
      message.messageBytes,
      message.attestation
    );
  };

  const handleMaximise = () => {
    if (arbBalance) {
      setCcptAmount(formatUnits(arbBalance, 6));
    }
  };

  return (
    <>
      <Loading open={loading || transferLoading || cctpLoading} />
      <div className="flex flex-col h-full">
        <header className="h-14 flex justify-center items-center border-b">
          <div className="text-lg font-semibold relative w-full flex items-center justify-center">
            <div className="absolute left-4">
              <Link href="/">
                <X />
              </Link>
            </div>
            Deposit Money
          </div>
        </header>
        <div className="mt-2 px-4 text-base font-medium">Please select your deposit method.</div>
        <div className="flex flex-col px-4 py-2">
          <div className="p-2">
            <RadioGroup
              value={depositMethod}
              onValueChange={(value) => {
                setApplepayAmount('');
                setCcptAmount('');
                setKycChecked(false);
                setDepositMethod(value);
              }}
              className="text-lg gap-4"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applepay" id="r1" />
                  <Label className="font-medium" htmlFor="r1">
                    Onramp USDC with Apple Pay
                  </Label>
                </div>
                {depositMethod === 'applepay' && (
                  <div className="mt-4">
                    <InputGroup
                      className="h-10 text-xl w-full font-medium"
                      value={applepayAmount}
                      onChange={(value) => setApplepayAmount(value)}
                      postfix="USDC"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="r2" />
                  <Label className="font-medium" htmlFor="r2">
                    Transfer USDC
                  </Label>
                </div>
                {depositMethod === 'transfer' && wallet?.address && (
                  <>
                    <div className="flex justify-center items-center mt-4">
                      <QRCodeSVG size={240} value={wallet.address} />
                    </div>
                    <div className="break-all text-xs text-center mt-2">{wallet?.address}</div>
                    <div>
                      <CopyToClipboard
                        text={wallet?.address}
                        onCopy={() => {
                          Toast.show({
                            icon: 'success',
                            content: 'Copied',
                          });
                        }}
                      >
                        <div className="flex text-center items-center cursor-pointer justify-center mt-1">
                          <div className="text-muted-foreground text-sm mr-2">Copy</div>
                          <Copy size="14" />
                        </div>
                      </CopyToClipboard>
                    </div>
                  </>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cctp" id="r3" />
                  <Label className="font-medium" htmlFor="r3">
                    CCTP USDC
                  </Label>
                </div>
                {depositMethod === 'cctp' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <span className="text-sm font-medium">From</span>
                      <InputGroup
                        inputReadonly={true}
                        className="h-10 text-lg w-full select-none"
                        value={'Arbitrum Sepolia'}
                      />
                    </div>
                    <div>
                      <span className="text-sm font-medium">Amount</span>
                      <InputGroup
                        className="h-10 text-xl w-full font-medium"
                        value={ccptAmount}
                        onChange={(value) => setCcptAmount(value)}
                        postfix={
                          <button className="text-secondary" onClick={handleMaximise}>
                            MAX
                          </button>
                        }
                      />
                      <span className="text-xs font-medium">
                        Balance:&nbsp;
                        {formatNumber(arbBalance, {
                          decimals: 6,
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mt-auto p-4">
          {applepayAmount && (
            <div className="p-4 border border-muted rounded-xl mb-4">
              <div className="flex justify-between font-medium">
                <div>Total you&apos;ll pay</div>
                <div>{applepayAmount} USD</div>
              </div>
            </div>
          )}
          <div className="space-y-2 mb-4">
            {depositMethod === 'applepay' && (
              <div
                onClick={() => setKycChecked(!jurisdictionChecked)}
                className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
              >
                <Checkbox ref={kycRef} checked={kycChecked} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  KYC requirements met
                </label>
              </div>
            )}
            {depositMethod !== 'transfer' && (
              <>
                <div
                  onClick={() => setJurisdictionChecked(!jurisdictionChecked)}
                  className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
                >
                  <Checkbox ref={jurisdictionRef} checked={jurisdictionChecked} />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Jurisdiction, not a sanctioned person or reside in list of sanctioned country
                  </label>
                </div>
                <div
                  onClick={() => setTermsChecked(!termsChecked)}
                  className="flex items-center space-x-2 border border-muted rounded-xl p-2 my-2"
                >
                  <Checkbox ref={termsRef} checked={termsChecked} />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Agree toi terms and condition
                  </label>
                </div>
              </>
            )}
          </div>
          {depositMethod === 'applepay' || depositMethod === 'transfer' ? (
            <Button className="rounded-3xl h-10 w-full text-lg" onClick={onSubmit}>
              {depositMethod === 'applepay' ? (
                <Image className="h-8" src={ApplePayIcon} alt="Apple Pay" />
              ) : (
                'Transfer Completed'
              )}
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                className={cn('rounded-3xl w-full', {
                  'bg-primary/50 hover:bg-primary/50': message,
                })}
                onClick={onCctpSubmit}
              >
                1. Transfer
              </Button>
              <Button
                className={cn('rounded-3xl w-full', {
                  'bg-primary/50 hover:bg-primary/50': !message,
                })}
                onClick={onCctpRedeem}
              >
                2. Redeem
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DepositPage;
