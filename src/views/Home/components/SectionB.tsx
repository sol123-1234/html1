import { useTranslation } from 'react-i18next'
import imtoken from '@/assets/imtoken@2x.png'
import metamsk from '@/assets/Metamask@2x.png'
import coinbase from '@/assets/Coinbase@2x.png'
import gnosis from '@/assets/GnosisSafe@2x.png'
import walletConnect from '@/assets/WalletConnect@2x.png'
import fireBlocks from '@/assets/FireBlocks@2x.png'
import zodia from '@/assets/ZodiaCustody@2x.png'
import useLocal from '@/hooks/useLocal'

const SectionB = () => {
  return (
    <div className="py-5 lg:py-16">
      <div className="lg:w-[1200px] m-auto">
        <Exchange />
        <WalletList />
        <HowWork />
        <Table />
      </div>
    </div>
  )
}

const WalletList = () => {
  const list = [imtoken, metamsk, coinbase, gnosis, walletConnect, fireBlocks, zodia]
  return (
    <>
      <div className="-mt-5 text-center lg:mt-20 lg:text-left">
        <div className="text-2xl lg:text-3xl">支持的钱包</div>
        <div className="text-[#666666] mt-3 lg:mt-7 text-base">Supported wallet</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5 lg:gap-0 lg:justify-between lg:mt-14">
        {list.map((item, index) => (
          <div key={index}>
            <img src={item} alt="" className="w-20 lg:w-[160px]" />
          </div>
        ))}
      </div>
    </>
  )
}

const Exchange = () => {
  const { t } = useTranslation()
  const { getLang } = useLocal()
  return (
    <div className="justify-between gap-16 px-4 lg:flex mt-9 lg:mt-14 lg:px-0">
      <img className="w-[535px] hidden lg:block" src={`./safe-${getLang()}.png`} alt="" />
      <div className="text-center mt-9 lg:mt-16 lg:text-left">
        <div className="text-2xl text-center lg:text-right lg:text-3xl">{t('exchange1')}</div>
        <div className="text-[#666666] leading-8 mt-7 lg:mt-14 text-base lg:text-base">{t('exchange2')}</div>
      </div>
      <img className="w-full lg:hidden" src={`./safe-${getLang()}.png`} alt="" />
    </div>
  )
}

const HowWork = () => {
  const { t } = useTranslation()
  const { getLang } = useLocal()
  return (
    <div className="lg:mt-[133px] lg:flex gap-[164px] mt-8">
      <div className="text-center lg:text-left">
        <div className="text-2xl lg:text-3xl">工作原理</div>
        <div className="text-[#666666] mt-3 lg:mt-7 text-base lg:text-base">How it works</div>
        <div className="text-[#333333] text-center lg:text-left leading-8 mt-7 lg:mt-14 text-base lg:text-base">
          {t('how work')}
        </div>
      </div>
      <img src={`./how-work-${getLang()}.png`} className="w-full lg:w-[600px]" alt="" />
    </div>
  )
}

const Table = () => {
  const { t } = useTranslation()
  const { getLang } = useLocal()
  return (
    <div className="mt-[45px] lg:mt-[90px] text-center">
      <div className="text-2xl leading-8 lg:text-3xl">{t('table1')}</div>
      <div className="text-[#666666] text-base lg:text-base mt-7">AUSD COMPARED TO OTHER STABLECOINS</div>
      <img src={`./table-${getLang()}.png`} alt="" className="hidden lg:block w-[1200px] mt-14" />
      <div className="px-8 lg:hidden">
        <img src={`./m-table-${getLang()}.png`} className="w-full mt-10 " alt="" />
      </div>
    </div>
  )
}

export default SectionB
