import BigNumber from 'bignumber.js';
import { Address, useAccount, useContractRead } from 'wagmi';
import { MaxUint256 } from 'ethers/constants';
import { useState } from 'react';
import { env } from '@/config/env';
import { getErc20Contract } from '@/utils/contractHelpers';
import useCatchTxError from './useCatchTxError';
import useCallWithGasPrice from './useCallWithGasPrice';

/**
 * @params token erc20 token address
 * @params spender spender address
 * @return isVaultApproved 是否授权
 * @return allowance 授权额度
 * @return setLastUpdated 更新授权额度
 */
export const useTokenApproval = (token: Address, spender: Address) => {
  const [approveLoading, setApproveLoading] = useState<boolean>(false)
  const { address: account } = useAccount();
  const { fetchWithCatchTxError } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()

  const { chainId } = env;

  const tokenContract = getErc20Contract(token)

  const { data, isLoading, refetch } = useContractRead({
    chainId,
    ...tokenContract,
    enabled: Boolean(account && spender && token),
    functionName: 'allowance',
    args: [account!, spender],
    watch: true,
  });


  const handleApprove = async (callback?: () => void) => {
    setApproveLoading(true)

    const result = await fetchWithCatchTxError(() =>
      callWithGasPrice(tokenContract, 'approve', [spender, MaxUint256]),
    )
    refetch()
    setApproveLoading(false)
    callback?.()

  }


  return {
    isVaultApproved: data! > 0,
    allowance: new BigNumber(data?.toString()),
    allowanceLoading: isLoading,
    approveLoading,
    setLastUpdated: refetch,
    handleApprove
  };
};

export default useTokenApproval;
