import { Token } from '@uniswap/sdk-core';

import { type Address, type PublicClient } from 'viem';

import { ERC20_ABI } from './abis/erc20';
import { MessageTransmitter } from './abis/message-transmitter';
import { TokenMessenger } from './abis/token-messenger';

export const CHAIN_IDS_TO_USDC_ADDRESSES = {
  ETH_SEPOLIA: '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238',
  AVAX_FUJI: '0x5425890298aed601595a70AB815c96711a31Bc65',
  ARB_SEPOLIA: '0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d',
};

export const CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES = {
  ETH_SEPOLIA: '0x9f3b8679c73c2fef8b59b4f3444d4e156fb70aa5',
  AVAX_FUJI: '0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0',
  ARB_SEPOLIA: '0x9f3b8679c73c2fef8b59b4f3444d4e156fb70aa5',
};

export const CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES = {
  ETH_SEPOLIA: '0x7865fafc2db2093669d92c0f33aeef291086befd',
  AVAX_FUJI: '0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79',
  ARB_SEPOLIA: '0xacf1ceef35caac005e15888ddb8a3515c41b4872',
};

export function addressToBytes32(address: string) {
  // "0x" + 24 zeros + Rest of the address string with leading "0x" trimmed
  return address.slice(0, 2) + '000000000000000000000000' + address.slice(2, address.length);
}

const AMOUNT = BigInt(100000);
export const sendContracts = async (
  publicClient: PublicClient,
  sourcChain = 'ETH_SEPOLIA' as const,
  walletAddress: string
) => {
  const amount = await publicClient.readContract({
    address: CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain] as Address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [walletAddress as any],
  });
  console.log('maxamount', amount);
  return [
    {
      address: CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain],
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES[sourcChain], AMOUNT],
    },
    {
      address: CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES[sourcChain],
      abi: TokenMessenger,
      functionName: 'depositForBurn',
      args: [AMOUNT, 3, addressToBytes32(walletAddress), CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain]],
    },
  ];
};

export const receiveContract = async (
  publicClient: PublicClient,
  sourcChain = 'ARB_SEPOLIA' as const,
  walletAddress: string
) => {
  const amount = await publicClient.readContract({
    address: CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain] as Address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [walletAddress as any],
  });
  console.log('maxamount', amount);
  return [
    {
      address: CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES[sourcChain],
      abi: MessageTransmitter,
      functionName: 'receiveMessage',
      args: [
        '0x00000000000000000000000300000000000402890000000000000000000000009f3b8679c73c2fef8b59b4f3444d4e156fb70aa50000000000000000000000009f3b8679c73c2fef8b59b4f3444d4e156fb70aa50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c7d4b196cb0c7b01d743fbc6116a902379c723800000000000000000000000006d40026e2200f502912c517303cac3f3f610c2700000000000000000000000000000000000000000000000000000000000186a000000000000000000000000006d40026e2200f502912c517303cac3f3f610c27',
        '0x95c44b5ad05ba6c212d1367a39a2720a951b8916c54cd266f86ecb57b89c3c244e9e04689dc730645d79d6ce47fc6c4eff359b9e1141184d9b13aea1a38049c31b589cba8b5a41e41fba5720eb0aa42d00cf11e333816654bcf1b6ae643ce25b651998ad15837a78eeddb1049e2f07d6a66acc495359539800be1eac1b639eb8361c',
      ],
    },
  ];
};

// {
//   internalType: 'uint256',
//   name: 'amount',
//   type: 'uint256',
// },
// {
//   internalType: 'uint32',
//   name: 'destinationDomain',
//   type: 'uint32',
// },
// {
//   internalType: 'bytes32',
//   name: 'mintRecipient',
//   type: 'bytes32',
// },
// {
//   internalType: 'address',
//   name: 'burnToken',
//   type: 'address',
// },
