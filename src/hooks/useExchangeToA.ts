import useCallWithGasPrice from "./useCallWithGasPrice"
import useCatchTxError from "./useCatchTxError"
import { getSwapContract } from "@/utils/contractHelpers"

export default function useExchangeToA() {
  const { fetchWithCatchTxError, loading: exchangeToALoading } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()

  const swapContract = getSwapContract()

  const exchangeToA = async (amount: bigint) => {
    await fetchWithCatchTxError(() => callWithGasPrice(swapContract, 'exchangeToA', [amount]))
  }
  return {
    exchangeToALoading,
    exchangeToA
  }
}