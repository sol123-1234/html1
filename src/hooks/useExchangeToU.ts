import useCallWithGasPrice from "./useCallWithGasPrice"
import useCatchTxError from "./useCatchTxError"
import { getSwapContract } from "@/utils/contractHelpers"

export default function useExchangeToU() {
  const { fetchWithCatchTxError, loading: exchangeToULoading } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()

  const swapContract = getSwapContract()

  const exchangeToU = async (amount: bigint) => {
    await fetchWithCatchTxError(() => callWithGasPrice(swapContract, 'exchangeToU', [amount]))
  }
  return {
    exchangeToULoading,
    exchangeToU
  }
}