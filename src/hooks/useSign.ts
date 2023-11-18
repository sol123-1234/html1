import { useCallback, useMemo } from 'react';
import { hashMessage } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import { useLocalStorageState } from 'ahooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useCatchTxError from './useCatchTxError';
import { Sign } from '@/types/account';

export default function useSign() {

  const defaultSign: Sign = useMemo(() => ({
    address: '',
    message: '',
    signature: '',
  }), []);
  const rawMessage = Math.random().toString(36).slice(-8);

  const { openConnectModal } = useConnectModal();

  const [sign, setSign] = useLocalStorageState<Sign | undefined>(
    'sign',
    {
      defaultValue: defaultSign,
    },
  );
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const { handleError } = useCatchTxError();

  const removeSign = useCallback(() => {
    setSign(defaultSign);
  }, [defaultSign, setSign]);

  const signAsync = useCallback(async () => {
    try {
      if (!isConnected) return openConnectModal();
      const signature = await walletClient.signMessage({
        account: address,
        message: rawMessage,
      });
      const message = hashMessage(rawMessage);
      setSign({
        address,
        message,
        signature,
      });
    } catch (error) {
      handleError(error);
      return false;
    }
    return true;
  }, [address, handleError, isConnected, openConnectModal, rawMessage, setSign, walletClient]);

  return {
    sign,
    signAsync,
    removeSign,
  };
}
