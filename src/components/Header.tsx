import logo from '@/assets/logo.png'
import CustomConnectButton from './CustomConnectButton'
import ChangeLang from './ChangeLang'

const Header = () => {
  return (
    <div className="bg-[#292929] overflow-hidden border-b border-[#4B4B4B] border-solid">
      <div className="lg:w-[1200px] w-full px-7 lg:px-0 m-auto my-7 flex justify-between items-center">
        <img src={logo} alt="" className="w-[93px] h-[33px] lg:w-[143px] lg:h-[50px]" />
        <div className="flex gap-x-4 lg:gap-x-10">
          <div className="hidden lg:block">
            <ChangeLang />
          </div>
          <CustomConnectButton />
        </div>
      </div>
      <div className="flex justify-end mb-5 -mt-4 lg:hidden px-7">
        <ChangeLang />
      </div>
    </div>
  )
}

export default Header
