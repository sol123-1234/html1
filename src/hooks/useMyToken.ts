import { Address, useAccount, useBalance, useToken } from "wagmi";


export default function useMyToken(tokenAddress: Address) {

  const { address, isConnected } = useAccount()

  const { data: token, isLoading } = useToken({
    address: tokenAddress,
  })


  const { data: tokenBalance } = useBalance({
    address,
    token: tokenAddress,
    watch: true,
    enabled: isConnected
  })



  return {
    ...tokenBalance,
    ...token,
    isLoading,
    iconPath: `./${token?.symbol.toLowerCase()}.png`,
  }
} 