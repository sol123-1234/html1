import { useTranslation } from 'react-i18next'
import useActiveChain from '@/hooks/useActiveChain'
import {
  formatAddress,
  getBlockExploreLink,
  getBlockExploreName
} from '@/utils'

interface DescriptionWithTxProps {
  txHash?: string
  txChainId?: number
  children?: React.ReactNode
}

const DescriptionWithTx: React.FC<
  React.PropsWithChildren<DescriptionWithTxProps>
> = ({ txHash, txChainId, children }) => {
  const chainId = useActiveChain()
  const { t } = useTranslation()

  return (
    <>
      {typeof children === 'string' ? <div>{children}</div> : children}
      {txHash && (
        <a
          target="_blank"
          href={getBlockExploreLink(
            txHash,
            'transaction',
            txChainId || chainId
          )}
          rel="noreferrer">
          {t('View on site', {
            site: getBlockExploreName(txChainId || chainId)
          })}
          :{formatAddress(txHash)}
        </a>
      )}
    </>
  )
}

export default DescriptionWithTx
