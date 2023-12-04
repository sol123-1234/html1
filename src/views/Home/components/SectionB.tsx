import imtoken from '@/assets/imtoken@2x.png'
import metamsk from '@/assets/Metamask@2x.png'
import coinbase from '@/assets/Coinbase@2x.png'
import gnosis from '@/assets/GnosisSafe@2x.png'
import walletConnect from '@/assets/WalletConnect@2x.png'
import fireBlocks from '@/assets/FireBlocks@2x.png'
import zodia from '@/assets/ZodiaCustody@2x.png'
import exchange from '@/assets/exchange.png'
import exchangeMobile from '@/assets/change-mobile.png'
import howWork from '@/assets/howWork.png'
import table from '@/assets/table.png'
import tableMobile from '@/assets/table-mobile.png'

const SectionB = () => {
  return (
    <div className="py-5 lg:py-16">
      <div className="lg:w-[1200px] m-auto">
        <div className="hidden lg:block">
          <WalletList />
        </div>
        <div>
          <Exchange />
        </div>
        <div className="mb-8 -mt-5 lg:hidden">
          <WalletList />
        </div>
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
      <div className="text-center lg:text-left">
        <div className="text-base lg:text-3xl">支持的钱包</div>
        <div className="text-[#666666] mt-3 lg:mt-7 text-xs lg:text-base">Supported wallet</div>
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
  return (
    <div className="justify-between gap-16 px-4 lg:flex mt-9 lg:mt-14 lg:px-0">
      <img className="w-[535px] hidden lg:block" src={exchange} alt="" />
      <div className="text-center mt-9 lg:mt-16 lg:text-left">
        <div className="text-base text-center lg:text-right lg:text-3xl">如何确保用户的本金和投资收益的安全？</div>
        <div className="text-[#666666] leading-8 mt-7 lg:mt-14 text-sm lg:text-base">
          平台建立去中心化交易所，设立AUSD/USDT交易池。采用时间锁机制, 在交易池中,
          锁仓200万USDT的自有资金，确保用户随时将AUSD兑换成USDT。
        </div>
      </div>
      <img className="w-full lg:hidden" src={exchangeMobile} alt="" />
    </div>
  )
}

const HowWork = () => {
  return (
    <div className="lg:mt-[133px] lg:flex gap-[164px]">
      <div className="text-center lg:text-left">
        <div className="text-base lg:text-3xl">工作原理</div>
        <div className="text-[#666666] mt-3 lg:mt-7 text-xs lg:text-base">How it works</div>
        <div className="text-[#333333] text-center lg:text-left leading-8 mt-7 lg:mt-14 text-sm lg:text-base">
          用户存入 USDT，平台将其兑换为美元，并投资于美国国债。随着美国国债收益的增加， 您的 AUSD
          数量也会随之增加，实现财富自动增值。
        </div>
      </div>
      <img src={howWork} className="w-full lg:w-[600px]" alt="" />
    </div>
  )
}

const Table = () => (
  <div className="mt-[45px] lg:mt-[90px] text-center">
    <div className="text-base leading-8 lg:text-3xl">AUSD 与其他稳定币对比 (流动性是2023年 七月全球成交量)</div>
    <div className="text-[#666666] text-sm lg:text-base mt-7">AUSD COMPARED TO OTHER STABLECOINS</div>
    <img src={table} alt="" className="hidden lg:block w-[1200px] mt-14" />
    <div className="px-8 lg:hidden">
      <img src={tableMobile} className="w-full mt-10 " alt="" />
    </div>
  </div>
)

export default SectionB
