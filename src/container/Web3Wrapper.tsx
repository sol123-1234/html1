import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { WagmiConfig, useAccount, useSwitchNetwork, useWalletClient } from 'wagmi'
import { env } from '@/config/env'
import { chains, wagmiConfig } from '@/config/wagmi'
import useSign from '@/hooks/useSign'
import useActiveChain from '@/hooks/useActiveChain'

const Web3Handler: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { switchNetwork } = useSwitchNetwork({
    onSuccess: () => {},
  })
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const { chainId: activeChainId } = useActiveChain()
  const { removeSign } = useSign()
  // 切换网络
  useEffect(() => {
    if (activeChainId !== env.chainId && activeChainId !== 0 && activeChainId !== undefined) {
      removeSign()
      switchNetwork?.(env.chainId)
    }
  }, [activeChainId, removeSign, switchNetwork, walletClient])

  useEffect(() => {
    if (!address) removeSign()
  }, [address, removeSign])

  return <div>{children}</div>
}

const Web3Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={env.chainId} theme={darkTheme()}>
        <Web3Handler>{children}</Web3Handler>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Web3Wrapper
