import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

const DataEmpty: React.FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => {
  const { t } = useTranslation()
  return <div className={`${className} text-center mt-4`}>{children ?? t('No Data')}</div>
}

export default DataEmpty
