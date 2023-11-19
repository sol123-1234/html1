import { ConnectButton } from '@rainbow-me/rainbowkit'
import change from '@/assets/change.png'

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    type="button"
                    onClick={openConnectModal}
                    className="flex items-center justify-center gap-2 px-5 py-3 border-none rounded-full outline-none lg:py-5 lg:px-9 bg-primary"
                  >
                    <div>链接钱包</div>
                    <img src={change} alt="" />
                  </button>
                )
              }
              return (
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="flex items-center justify-center gap-2 px-5 py-3 border-none rounded-full outline-none lg:py-5 lg:px-9 bg-primary"
                >
                  {account.displayName}
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
