import logo from '@/assets/logo.png'
import CustomConnectButton from './CustomConnectButton'

const Header = () => {
  return (
    <div className="bg-[#292929] overflow-hidden border-b border-[#4B4B4B] border-solid">
      <div className="lg:w-[1200px] w-full px-7 lg:px-0 m-auto my-7 flex justify-between items-center">
        <img src={logo} alt="" className="w-[93px] h-[33px] lg:w-[143px] lg:h-[50px]" />
        <CustomConnectButton />
      </div>
    </div>
  )
}

export default Header
