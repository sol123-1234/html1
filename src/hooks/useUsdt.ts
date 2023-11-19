import { useAccount, useBalance, useToken } from "wagmi";
import { getUsdtAddress } from "@/utils/addressHelpers";

const usdtAddress = getUsdtAddress()

export default function useUsdt() {
  const { address, isConnected } = useAccount()

  const { data: usdtToken } = useToken({
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
    ...usdtToken
  }
} 