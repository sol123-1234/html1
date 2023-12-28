import { useAccount, useBalance, useToken } from "wagmi";
import { getSwapAddress, getUsdtAddress } from "@/utils/addressHelpers";
import icon from '@/assets/USDT.png'
import { formatNumber } from "@/utils/formatBalance";

const usdtAddress = getUsdtAddress()

export default function useUsdt() {

  const swapAddress = getSwapAddress()

  const { address, isConnected } = useAccount()

  const { data: usdtToken, isLoading } = useToken({
    address: usdtAddress,
  })


  const { data: usdtBalance, refetch } = useBalance({
    address,
    token: usdtAddress,
    watch: true,
    enabled: isConnected
  })

  const { data: pollUsdtBalance } = useBalance({
    address: swapAddress,
    token: usdtAddress,
    watch: true
  })

  return {
    ...usdtBalance,
    ...usdtToken,
    icon,
    isLoading,
    //symbol: 'USDT',
    poolBalance: formatNumber(pollUsdtBalance?.formatted || '0', 0, 0) || '0',
    refetch
  }
} 
