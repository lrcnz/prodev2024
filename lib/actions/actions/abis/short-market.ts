export const SHORT_MARKET_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    name: 'closePosition',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'dataFeeds',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'getPrice',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'leverage', type: 'uint256' },
    ],
    name: 'openShortPosition',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'positions',
    outputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'openPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'leverage', type: 'uint256' },
      { internalType: 'bool', name: 'isOpen', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'address', name: 'dataFeed', type: 'address' },
    ],
    name: 'setDataFeed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
