import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import seven from '@/assets/seven.png'
import one from '@/assets/one.png'
import money from '@/assets/money.png'
import free from '@/assets/free.png'
import Function from './Funtion.tsx'

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
  const { t } = useTranslation()
  const showList = [
    {
      img: seven,
      title: '8.2%',
      des: t('7day APY'),
    },
    {
      img: one,
      title: '1:1',
      des: t('1:1 USDT-AUSD swap'),
    },
    {
      img: money,
      title: 'GAS',
      des: t('only gas fees'),
    },
    {
      img: free,
      title: '0%',
      des: t('Extra transaction fees'),
    },
  ]
  return (
    <SectionAWrapper className=" w-full lg:h-[960px] text-[#fff] bg-center bg-cover">
      <div className="lg:w-[1200px] m-auto lg:flex justify-between overflow-hidden">
        <div className="lg:w-[700px] text-center lg:text-left px-7">
          <div className="mt-[44px] lg:mt-[150px] text-[26px] lg:text-[45px]">
            {t('AUSD - The Auto-Appreciating Treasury Bond Stablecoin')}
          </div>
          <div className="mt-6 text-base lg:mt-14 lg:text-lg">{t('anchoring')}</div>
          <div className="text-base leading-8 mt-9 lg:mt-24 lg:text-lg">
            {t('sixmonth')}
            <br className="hidden lg:block" />
            {t('sixmonth2')}
          </div>
          <div className="text-base mt-9 lg:mt-24 lg:text-lg">{t('des1')}</div>
          <div className="flex items-center justify-between mt-[85px]">
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
          <Function />
        </div>
      </div>
    </SectionAWrapper>
  )
}

export default SectionA
