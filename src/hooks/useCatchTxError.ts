import { Toast } from 'antd-mobile';
import { useCallback, useState } from 'react';
import { Address, Hash } from 'viem';
import { SendTransactionResult, WaitForTransactionResult, waitForTransaction } from 'wagmi/actions';
import { useTranslation } from 'react-i18next';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletClient } from 'wagmi';
import useToast from './useToast';
import { pareseJson, renderJson } from '@/utils/json';

/**
 * @description 捕获交易错误 可拿到hash
 */
export type CatchTxErrorReturn = {
  fetchWithCatchTxError: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<WaitForTransactionResult>
  fetchTxResponse: (fn: () => Promise<SendTransactionResult | Hash>) => Promise<SendTransactionResult>
  handleError: (error: any) => void
  loading: boolean
  txResponseLoading: boolean
};




export default function useCatchTxError(): CatchTxErrorReturn {
  const { toastSuccess, toastError } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [txResponseLoading, setTxResponseLoading] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { data: walletClient } = useWalletClient();
  const parseError = (error: any) => pareseJson(renderJson(error));

  const handleError = useCallback((error: any) => {
    if (!walletClient?.account) {
      toastError('', t('Please connect wallet'));
      openConnectModal();
    } else {
      let err = null
      try {
        err = parseError(error);
      } finally {
        Toast.show(err.cause.reason || err.shortMessage);
      }
    }
  }, [openConnectModal, t, toastError, walletClient?.account]);

  const handleTxError = useCallback((error: any, hash: Address) => {
    console.error(error);
    const err = parseError(error);
    toastError(hash, `${t('Failed')} : ${err?.cause?.reason || err?.shortMessage || 'Some error happend'}`);
  }, [t, toastError]);

  const fetchTxResponse = useCallback(
    async (callTx: () => Promise<SendTransactionResult | Hash>): Promise<SendTransactionResult> => {
      let tx: SendTransactionResult | Hash = null;

      try {
        setTxResponseLoading(true);
        tx = await callTx();
        const hash = typeof tx === 'string' ? tx : tx.hash;
        toastSuccess(hash, t('Transaction Submit'));
        return { hash };
      } catch (error: any) {
        handleError(error);
      } finally {
        setTxResponseLoading(false);
      }

      return null;
    },
    [handleError, t, toastSuccess],
  );



  const fetchWithCatchTxError = useCallback(
    async (callTx: () => Promise<SendTransactionResult | Hash>): Promise<WaitForTransactionResult | null> => {
      let tx: SendTransactionResult | Hash = null;
      try {
        setLoading(true);
        tx = await callTx();
        const hash = typeof tx === 'string' ? tx : tx.hash;
        const receipt = await waitForTransaction({
          hash,
        });
        toastSuccess(hash, t('Transaction Success'));
        return receipt;
      } catch (error: any) {
        if (!tx) {
          handleError(error);
        } else {
          handleTxError(error, typeof tx === 'string' ? tx : tx.hash);
        }
      } finally {
        setLoading(false);
      }

      return null;
    },
    [handleError, handleTxError, t, toastSuccess],
  );

  return {
    fetchWithCatchTxError,
    fetchTxResponse,
    handleError,
    loading,
    txResponseLoading,
  };
}
