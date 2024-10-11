import { defaultAbiCoder, id, keccak256 } from 'ethers/lib/utils';

import type { Bytes } from 'ethers/lib/utils';

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

export function getMessageBytesFromEventLogs(logs: any[], topic: string): Bytes {
  const eventTopic = id(topic);
  const log = logs.filter((l) => l.topics[0] === eventTopic)[0];
  return defaultAbiCoder.decode(['bytes'], log.data)[0] as Bytes;
}

export function getMessageHashFromBytes(message: Bytes): string {
  return keccak256(message);
}

export const sendContracts = async (sourcChain = 'ARB_SEPOLIA' as const, walletAddress: string, amount: bigint) => {
  return [
    {
      address: CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain],
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES[sourcChain], amount],
    },
    {
      address: CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES[sourcChain],
      abi: TokenMessenger,
      functionName: 'depositForBurn',
      args: [amount, 0, addressToBytes32(walletAddress), CHAIN_IDS_TO_USDC_ADDRESSES[sourcChain]],
    },
  ];
};

export const receiveContract = async (sourcChain = 'ETH_SEPOLIA' as const, message: string, attestation: string) => {
  return [
    {
      address: CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES[sourcChain],
      abi: MessageTransmitter,
      functionName: 'receiveMessage',
      args: [message, attestation],
    },
  ];
};
