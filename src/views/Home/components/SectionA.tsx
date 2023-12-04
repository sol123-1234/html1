import styled from 'styled-components'
import seven from '@/assets/seven.png'
import one from '@/assets/one.png'
import money from '@/assets/money.png'
import free from '@/assets/free.png'
import Swap from './Swap'

const SectionAWrapper = styled.div`
  background-color: #292929;
  background-image: url('./bg.png');
  background-repeat: no-repeat;
  background-position-y: -120px;
  background-size: cover;
  @media (max-width: 768px) {
    background-image: url('./bg-mobile.png');
    background-color: linear-gradient(to bottom, #292929 90%, white 0);
  }
`

const SectionA = () => {
  const showList = [
    {
      img: seven,
      title: '8.2%',
      des: '7日APY',
    },
    {
      img: one,
      title: '1:1',
      des: '闪兑 usdt 1:1 ausd',
    },
    {
      img: money,
      title: 'GAS',
      des: '只有gas费',
    },
    {
      img: free,
      title: '0%',
      des: '额外费用手续费',
    },
  ]
  return (
    <SectionAWrapper className=" w-full lg:h-[960px] text-[#fff] bg-center bg-cover">
      <div className="lg:w-[1200px] m-auto lg:flex justify-between overflow-hidden">
        <div className="lg:w-[700px] text-center lg:text-left px-7">
          <div className="mt-[44px] lg:mt-[150px] text-[26px] lg:text-[52px]">AUSD是自动增值的稳定币</div>
          <div className="mt-6 text-sm lg:mt-14 lg:text-lg">与美元1:1锚定，无需质押，且8.2%年化收益率。</div>
          <div className="text-sm leading-8 mt-9 lg:mt-24 lg:text-lg">
            底层资产由到期日在6个月内的美国国债组成, AUSD 采用独特的 <br className="hidden lg:block" /> Rebase 机制.
          </div>
          <div className="text-sm mt-9 lg:mt-24 lg:text-lg">
            根据美国国债收益率,每秒增加用户的AUSD 的数量，并实现资产 持续增值。
          </div>
          <div className="flex items-center justify-between mt-[96px]">
            {showList.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <img className="w-[30px] lg:w-[60px]" src={item.img} alt="" />
                <div className="mt-5 text-xl lg:mt-10 lg:text-4xl text-primary">{item.title}</div>
                <div className="text-[#C9C9C9] mt-3 lg:mt-6 text-xs lg:text-base">{item.des}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 px-3 lg:px-0">
          <Swap />
        </div>
      </div>
    </SectionAWrapper>
  )
}

export default SectionA
