import { useAccount, useBalance, useToken } from "wagmi";


export default function useEth() {

  const { address, isConnected } = useAccount()

  const { data: token, isLoading } = useToken()


  const { data: tokenBalance } = useBalance({
    address,
    watch: true,
    enabled: isConnected
  })



  return {
    ...tokenBalance,
    ...token,
    isLoading,
    symbol: 'ETH',
    iconPath: `./eth.png`,
  }
} 