import { useTranslation } from 'react-i18next'
import conis from '@/assets/coins.png'

const SectionC = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-[#292929] overflow-hidden">
      <div className="lg:w-[1200px] m-auto lg:flex gap-[200px]">
        <div className="mt-8 text-center lg:mt-24 lg:text-left">
          <div className="text-[#fff] text-2xl lg:text-3xl">{t('Proof of Assets')}</div>
          <div className="px-5 lg:px-0 text-[#C9C9C9] text-xl mt-8 lg:mt-16 leading-8">{t('c1')}</div>
        </div>
        <div className="py-5 text-center lg:py-0">
          <img src={conis} alt="" className="w-[200px] lg:w-[400px] mt-[60px]" />
        </div>
      </div>
    </div>
  )
}

export default SectionC
