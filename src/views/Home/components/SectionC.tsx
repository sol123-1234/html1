import conis from '@/assets/coins.png'

const SectionC = () => {
  return (
    <div className="bg-[#292929] overflow-hidden">
      <div className="lg:w-[1200px] m-auto lg:flex gap-[200px]">
        <div className="mt-8 text-center lg:mt-24 lg:text-left">
          <div className="text-[#fff]   text-base lg:text-3xl">资产证明</div>
          <div className="px-5 lg:px-0 text-[#C9C9C9] text-sm lg:text-base mt-8 lg:mt-16 leading-8">
            铸造AUSD代币的资金,投资于六个月内到期的美国国债,
            费用是完全透明的。底层资产由第三方托管人持有，并用作担保AUSD代币的储备。
            所有与AUSD的铸造、销毁和REBASE相关的历史交易记录,可以随时在以太坊浏览器（AUSD
            ）.上查看。此外，每日资产报告文件上传至AUSD网站.上以供审核。
          </div>
        </div>
        <div className="py-5 text-center lg:py-0">
          <img src={conis} alt="" className="w-[200px] lg:w-[400px] mt-[60px]" />
        </div>
      </div>
    </div>
  )
}

export default SectionC
