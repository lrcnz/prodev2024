import { ChainId, CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core';
import { Pair, Route, Trade } from '@uniswap/v2-sdk';
import { type Address, parseUnits, type PublicClient } from 'viem';

import { ERC20_ABI } from './abis/erc20';
import { USTB_ABI } from './abis/ustb';
import { USDC_ADDRESS, USTB_ADDRESS } from './contracts';

import { LIDO } from '@/lib/abis/lido';
import { RENZO } from '@/lib/abis/renzo';
import { SHORT_MARKET_ABI } from '@/lib/abis/short-market';
import { UNISWAP_INTERFACE } from '@/lib/abis/uniswap-interface';
import { UNI_SWAP_PAIR } from '@/lib/abis/uniswap-pair';
import { WETH_ABI } from '@/lib/abis/weth';
import { EZ_ETH_ADDRESS, MOCK_SHORT_MARKET, ST_ETH_ADDRESS, SWAP_CONTRACT, UNI_WETH_ADDRESS } from '@/lib/contracts';

const WETH = new Token(ChainId.SEPOLIA, UNI_WETH_ADDRESS, 18, 'WETH');
const USDC = new Token(ChainId.SEPOLIA, USDC_ADDRESS, 6, 'USDC');

const PAIR_ADDRESS: Record<string, string> = {
  'stETH-WETH': '0x3F5a1F590034Bdf7fa8f02D21e6F95625DA79330',
  'WETH-USDC': '0xC4b215aFEa0333350B5807a734042f785715Ab4a',
  'USDT-USDC': '0x1f01DC7394B6eD5AfeEe969d3F7B7De17e5a958e',
};

async function createPair(publicClient: PublicClient, tokenA: Token, tokenB: Token): Promise<[Address, Pair]> {
  // const pairAddress = Pair.getAddress(tokenA, tokenB)
  const symbolA = tokenA.symbol as string;
  const symbolB = tokenB.symbol as string;

  const pairAddress: Address = (PAIR_ADDRESS[`${symbolA}-${symbolB}`] ||
    PAIR_ADDRESS[`${symbolB}-${symbolA}`]) as Address;

  const reserves = await publicClient.readContract({
    address: pairAddress,
    abi: UNI_SWAP_PAIR,
    functionName: 'getReserves',
  });
  const [reserve0, reserve1] = reserves;

  const tokens = [tokenA, tokenB];
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];
  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserve1.toString())
  );

  return [pairAddress, pair] as const;
}

const getSwapArgs = async (
  publicClient: PublicClient,
  walletAddress: Address,
  token0: Token,
  token1: Token,
  amount: bigint
) => {
  const [, pair] = await createPair(publicClient, token0, token1);
  const router = new Route([pair], token0, token1);
  const trade = new Trade(router, CurrencyAmount.fromRawAmount(token0, amount.toString()), TradeType.EXACT_INPUT);

  const slippageTolerance = new Percent('500', '10000'); // 5%

  const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact(); // needs to be converted to e.g. decimal string
  const path = [token0.address, token1.address];
  const to = walletAddress;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

  return [amount, parseUnits(amountOutMin, token1.decimals), path, to, deadline];
};

export const getTrade = async (
  publicClient: PublicClient,
  token0: Token,
  token1: Token,
  amount: CurrencyAmount<Token>,
  type: TradeType
) => {
  const [, pair] = await createPair(publicClient, token0, token1);
  const router = new Route([pair], token0, token1);
  const trade = new Trade(router, amount, type);

  return trade;
};

export const depositSavingsContract = async (
  publicClient: PublicClient,
  walletAddress: string,
  usdcAmount?: bigint
) => {
  if (!usdcAmount) {
    usdcAmount = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as Address],
    });
  }

  return [
    {
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [USTB_ADDRESS, usdcAmount],
    },
    {
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'deposit',
      args: [usdcAmount],
    },
  ];
};

export const withdrawSavingsContract = async (
  publicClient: PublicClient,
  walletAddress: string,
  usdcAmount?: bigint
) => {
  if (!usdcAmount) {
    usdcAmount = await publicClient.readContract({
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as Address],
    });
  }

  return [
    {
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'withdraw',
      args: [usdcAmount],
    },
  ];
};

export const depositGrowthContract = async (publicClient: PublicClient, walletAddress: string, usdcAmount?: bigint) => {
  if (!usdcAmount) {
    usdcAmount = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as Address],
    });
  }

  const swapArgs = await getSwapArgs(publicClient, walletAddress as Address, USDC, WETH, usdcAmount);
  const minEth = swapArgs[1];
  const halfEth = BigInt(minEth as any) / BigInt(2);

  return [
    {
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [SWAP_CONTRACT, usdcAmount],
    },
    {
      address: SWAP_CONTRACT,
      abi: UNISWAP_INTERFACE,
      functionName: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      args: swapArgs,
    },
    {
      address: ST_ETH_ADDRESS,
      abi: LIDO,
      functionName: 'deposit',
      args: [],
      value: halfEth,
    },
    {
      address: ST_ETH_ADDRESS,
      abi: LIDO,
      functionName: 'approve',
      args: [EZ_ETH_ADDRESS, halfEth],
    },
    {
      address: EZ_ETH_ADDRESS,
      abi: RENZO,
      functionName: 'deposit',
      args: [halfEth],
    },
    {
      address: UNI_WETH_ADDRESS,
      abi: WETH_ABI,
      functionName: 'deposit',
      value: [halfEth],
    },
    {
      address: UNI_WETH_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [MOCK_SHORT_MARKET, halfEth],
    },
    {
      address: MOCK_SHORT_MARKET,
      abi: SHORT_MARKET_ABI,
      functionName: 'openShortPosition',
      args: [UNI_WETH_ADDRESS, halfEth, 2],
    },
  ];
};

export const getGrowthAmountEstimate = async (publicClient: PublicClient, walletAddress: string) => {
  const wethBalance = await publicClient.readContract({
    address: UNI_WETH_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [walletAddress as any],
  });

  const positions = await publicClient.readContract({
    abi: SHORT_MARKET_ABI,
    address: MOCK_SHORT_MARKET as Address,
    functionName: 'positions',
    args: [UNI_WETH_ADDRESS as Address, walletAddress as Address],
  });

  const ezBalance = await publicClient.readContract({
    address: EZ_ETH_ADDRESS,
    abi: RENZO,
    functionName: 'balanceOf',
    args: [walletAddress as any],
  });

  const maxEthbalance = await publicClient.getBalance({
    address: walletAddress as Address,
  });

  const ethAmount = wethBalance + positions[0] + ezBalance + maxEthbalance;

  const trade = !ethAmount
    ? undefined
    : await getTrade(
        publicClient,
        WETH,
        USDC,
        CurrencyAmount.fromRawAmount(WETH, ethAmount.toString()),
        TradeType.EXACT_INPUT
      );

  return {
    trade,
    wethBalance,
    positionDeposit: positions[0],
    ezBalance,
  };
};

export const withdrawGrowthContract = async (
  publicClient: PublicClient,
  walletAddress: string,
  usdcAmount?: bigint
) => {
  const { wethBalance, positionDeposit, ezBalance } = await getGrowthAmountEstimate(publicClient, walletAddress);
  const maxEthBalance = await publicClient.getBalance({
    address: walletAddress as Address,
  });

  let contracts: any[] = [];

  const wethAmount = positionDeposit + wethBalance;

  if (positionDeposit) {
    contracts = contracts.concat([
      {
        address: MOCK_SHORT_MARKET,
        abi: SHORT_MARKET_ABI,
        functionName: 'closePosition',
        args: [UNI_WETH_ADDRESS, walletAddress],
      },
    ]);
  }

  if (wethAmount) {
    contracts = contracts.concat([
      {
        address: UNI_WETH_ADDRESS,
        abi: WETH_ABI,
        functionName: 'withdraw',
        args: [wethAmount],
      },
    ]);
  }

  if (ezBalance) {
    contracts = contracts.concat([
      {
        address: EZ_ETH_ADDRESS,
        abi: RENZO,
        functionName: 'withdraw',
        args: [ezBalance],
      },
      {
        address: ST_ETH_ADDRESS,
        abi: LIDO,
        functionName: 'withdraw',
        args: [ezBalance],
      },
    ]);

    if (usdcAmount) {
      contracts = contracts.concat([
        {
          address: SWAP_CONTRACT,
          abi: UNISWAP_INTERFACE,
          value: maxEthBalance,
          functionName: 'swapETHForExactTokens',
          args: [usdcAmount, [WETH.address, USDC.address], walletAddress, Math.floor(Date.now() / 1000) + 60 * 20],
        },
      ]);
    }

    if (!usdcAmount) {
      const swapArgs = await getSwapArgs(
        publicClient,
        walletAddress as Address,
        WETH,
        USDC,
        BigInt(wethBalance + ezBalance + positionDeposit)
      );

      contracts = contracts.concat([
        {
          address: SWAP_CONTRACT,
          abi: UNISWAP_INTERFACE,
          value: maxEthBalance,
          functionName: 'swapExactETHForTokens',
          args: swapArgs.slice(1),
        },
      ]);
    }
  }

  return contracts;
};
