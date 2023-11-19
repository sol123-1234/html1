import { useAccount, useBalance, useToken } from "wagmi";
import { getAusdAddress } from "@/utils/addressHelpers";

const ausdAddress = getAusdAddress()

export default function useAusd() {
  const { address, isConnected } = useAccount()

  const { data: ausdToken } = useToken({
    address: ausdAddress,
  })

  const { data: ausdBalance } = useBalance({
    address,
    token: ausdAddress,
    watch: true,
    enabled: isConnected
  })

  return {
    ...ausdBalance,
    ...ausdToken
  }
} 