/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Action, type Contracts, Logic } from '../types';

import { LIDO } from './abis/lido';
import { RENZO } from './abis/renzo';

import { CommonOutputPreview } from './utils/common-output-preview';

import { Circuit } from '@/lib/box/circuit';
import { type CircuitData } from '@/lib/box/types';
import { EZ_ETH_ADDRESS, ST_ETH_ADDRESS } from '@/lib/contracts';

export class RenzoAction implements Action {
  readonly id = 'zenzo';
  readonly riskLevel = 'medium';
  readonly contractAddress = EZ_ETH_ADDRESS;

  public getDescription(data: Circuit) {
    const inputToken = data.details.inputToken?.[0];

    if (!inputToken) return '';

    return `Stake ${inputToken} on Zenzo`;
  }

  public getOutputPreviewElement(circuit: Circuit) {
    const Preview = () => {
      return <CommonOutputPreview tokens={['ezETH']} />;
    };

    return Preview;
  }

  public getOutputToken(_data: CircuitData) {
    return ['ezETH'];
  }

  public getNextCircuit(data: CircuitData) {
    return [new Circuit({ inputToken: ['ezETH'] })];
  }

  public checkIfUseable(circuit: Circuit) {
    const inputToken = circuit.details.inputToken;

    return !!inputToken && inputToken.length === 1 && inputToken[0] === 'stETH';
  }

  public getAPY(_data: CircuitData) {
    return 0.01;
  }

  public async getContracts(amount: bigint): Promise<Contracts> {
    return [
      {
        address: ST_ETH_ADDRESS,
        abi: LIDO,
        functionName: 'approve',
        args: [this.contractAddress, amount],
      },
      {
        address: this.contractAddress,
        abi: RENZO,
        functionName: 'deposit',
        args: [amount],
      },
    ];
  }
}
