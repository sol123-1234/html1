import { useCallback } from 'react';
import {
  Abi,
  Account,
  Address,
  CallParameters,
  Chain,
  EstimateContractGasParameters,
  GetFunctionArgs,
  InferFunctionName,
  WriteContractParameters,
} from 'viem';
import { useWalletClient } from 'wagmi';
import { SendTransactionResult } from 'wagmi/actions';
import { calculateGasMargin } from '@/utils';
import { publicClient } from '@/config/wagmi';
import { env } from '@/config/env';

/**
* @description callWithGasPrice 预估gas并发送交易 返回交易hash
* @param gasMargin gas增加量 1000n = 10%
* @param chainId 链id
* @return hash
*/
export default function useCallWithGasPrice(gasMargin = 1000n, chainId = env.chainId) {
  const { data: walletClient } = useWalletClient();
  const callWithGasPriceWithSimulate = useCallback(
    async <
      TAbi extends Abi | unknown[],
      TFunctionName extends string = string,
      _FunctionName = InferFunctionName<TAbi, TFunctionName>,
      Args = TFunctionName extends string
      ? GetFunctionArgs<TAbi, TFunctionName>['args']
      : _FunctionName extends string
      ? GetFunctionArgs<TAbi, _FunctionName>['args']
      : never,
    >(
      contract: { abi: TAbi; account: Account; chain: Chain; address: Address },
      functionName: InferFunctionName<TAbi, TFunctionName>,
      methodArgs?: Args extends never ? undefined : Args,
      overrides?: Omit<CallParameters, 'chain' | 'to' | 'data'>,
    ): Promise<SendTransactionResult> => {
      const gas = await publicClient({ chainId }).estimateContractGas({
        abi: contract.abi,
        address: contract.address,
        account: walletClient!.account,
        functionName,
        args: methodArgs,
        value: 0n,
        ...overrides,
      } as unknown as EstimateContractGasParameters);
      const res = await walletClient!.writeContract({
        abi: contract.abi,
        address: contract.address,
        account: walletClient!.account,
        functionName,
        args: methodArgs,
        gas: calculateGasMargin(gas, gasMargin),
        value: 0n,
        ...overrides,
      } as unknown as WriteContractParameters);

      const hash = res;

      return {
        hash,
      };
    },
    [chainId, gasMargin, walletClient],
  );

  return { callWithGasPrice: callWithGasPriceWithSimulate };
}
