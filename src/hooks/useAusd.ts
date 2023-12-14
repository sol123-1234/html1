import { useAccount, useBalance, useToken } from "wagmi";
import { useInterval } from "ahooks";
import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { getAusdAddress, getSwapAddress } from "@/utils/addressHelpers";
import icon from '@/assets/a.png'
import { formatNumber } from "@/utils/formatBalance";

const ausdAddress = getAusdAddress()
const swapAddress = getSwapAddress()

export default function useAusd() {

  const [formatted, setFormateed] = useState('0')

  const { address, isConnected } = useAccount()

  const { data: ausdToken, isLoading } = useToken({
    address: ausdAddress,
  })

  const { data: ausdBalance, refetch } = useBalance({
    address,
    token: ausdAddress,
    // watch: true,
    enabled: isConnected,
    onSuccess: (data) => {
      setFormateed(data.formatted)
    }
  })

  const { data: pollAusdBalance } = useBalance({
    address: swapAddress,
    token: ausdAddress,
    watch: true
  })

  const dsr: BigNumber = useMemo(() => {
    return BigNumber('1000000001547125957863212448').div(10 ** 27)
  }, [])

  useInterval(() => {
    if (formatted !== '0') {
      setFormateed((currentBalance) => {
        return Number(BigNumber(currentBalance).times(dsr).valueOf()).toFixed(18).valueOf()
      })
    }
  }, 1000);


  return {
    ...ausdBalance,
    ...ausdToken,
    symbol: 'AUSD',
    isLoading,
    icon,
    formatted,
    poolBalance: formatNumber(pollAusdBalance?.formatted || '0', 0, 0) || '0',
    refetch
  }
} 