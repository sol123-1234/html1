import { useAccount, useBalance, useToken } from "wagmi";
import { getUsdtAddress } from "@/utils/addressHelpers";
import icon from '@/assets/USDT.png'

const usdtAddress = getUsdtAddress()

export default function useUsdt() {
  const { address, isConnected } = useAccount()

  const { data: usdtToken, isLoading } = useToken({
    address: usdtAddress,
  })


  const { data: usdtBalance } = useBalance({
    address,
    token: usdtAddress,
    watch: true,
    enabled: isConnected
  })

  return {
    ...usdtBalance,
    ...usdtToken,
    icon,
    isLoading
  }
} 