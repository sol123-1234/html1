import logo from '@/assets/logo.png'
import change from '@/assets/change.png'

const Header = () => {
  return (
    <div className="bg-[#292929] overflow-hidden border-b border-[#4B4B4B] border-solid">
      <div className="lg:w-[1200px] w-full px-7 lg:px-0 m-auto my-7 flex justify-between items-center">
        <img src={logo} alt="" className="w-[93px] h-[33px] lg:w-[143px] lg:h-[50px]" />
        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-full lg:py-5 lg:px-9 bg-primary">
          <div>链接钱包</div>
          <img src={change} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
