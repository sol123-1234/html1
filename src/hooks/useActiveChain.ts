import { useCallback, useEffect, useState } from 'react';
import { fromHex } from 'viem';

/**
 * @return 获取当前链的 chainId
 */
const useActiveChain = () => {
  const [chainId, setChainId] = useState<number>();

  const changeChain = useCallback(() => {
    if (window?.ethereum) {
      window.ethereum.on('chainChanged', (currentChainId: `0x${string}`) => {
        setChainId(fromHex(currentChainId, 'number'));
      });
    }
  }, [setChainId])

  useEffect(() => {
    setChainId(fromHex(window.ethereum?.chainId ?? '0x0', 'number'));
    changeChain()
  }, [changeChain]);
  return {
    chainId,
    changeChain
  };
};

export default useActiveChain
