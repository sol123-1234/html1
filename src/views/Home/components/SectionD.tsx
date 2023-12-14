import { useTranslation } from 'react-i18next'
import copy from '@/assets/copy.png'
// import share from '@/assets/share.png'
import x from '@/assets/x.png'
import te from '@/assets/t.png'
import gi from '@/assets/gi.png'

const SectionD = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="lg:w-[1200px] m-auto py-10 lg:py-[77px] lg:flex justify-between">
        <div className="flex-1 px-6 lg:px-0">
          <div className="text-2xl lg:text-3xl">{t('On-chain address')}</div>
          <div className="flex items-baseline justify-between mt-5 lg:mt-[55px] pb-5 lg:pb-10 lg:border-none border-b border-solid border-[#C9C9C9]">
            {/* <div className="text-xs lg:text-2xl mr-[85px] lg:mr-[190px]">OUSG</div> */}
            <div className="flex-1">
              <AddressCompose name={t('Ethereum')} address="0xf6..856c" />
              <div className="mt-10">
                <AddressCompose name={t('Polygon')} address="0xf6..856c" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 px-6 lg:justify-end lg:px-0">
          <div>
            <div className="text-base font-bold lg:text-3xl mt-11 lg:mt-0">{t('Contact')}</div>
            <div className="flex items-center gap-5 mt-7 lg:mt-14">
              <div>
                <a target="_blank" rel="noreferrer" href="https://x.com/ausd888?s=21">
                  <img className="w-5 lg:w-8" src={x} alt="" />
                </a>
              </div>
              <div>
                <a target="_blank" rel="noreferrer" href="https://t.me/ausd11">
                  <img className="w-5 lg:w-8" src={te} alt="" />
                </a>
              </div>
              <div>
                <a target="_blank" rel="noreferrer" href="https://www.gitbook.com/blog/meet-the-all-new-gitbook">
                  <img className="w-6 lg:w-10" src={gi} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AddressCompose: React.FC<{
  name: string
  address: string
}> = ({ name, address }) => (
  <div className="flex items-center justify-between flex-1 text-xl ">
    <div className="text-[#888888]">{name}</div>
    <div className="flex items-center gap-4 lg:gap-[30px]">
      <div>{address}</div>
      <div>
        <img src={copy} className="w-3 lg:w-6" alt="" />
      </div>
      <div>{/* <img src={share} className="w-3 lg:w-6" alt="" /> */}</div>
    </div>
  </div>
)
export default SectionD
