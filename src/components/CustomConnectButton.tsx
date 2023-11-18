import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

export default function CustomConnectButton() {
  const { t } = useTranslation()
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
                  <Button
                    color="default"
                    className="px-3 py-2 text-sm bg-transparent border border-solid rounded-lg border-theme-primary text-theme-primary"
                    onClick={openConnectModal}
                    size="small"
                  >
                    {t('Connect Wallet')}
                  </Button>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button
                    onClick={openAccountModal}
                    type="button"
                    className="px-3 py-2 text-sm bg-transparent border border-solid rounded-lg border-theme-primary text-theme-primary"
                  >
                    {account.displayName}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
