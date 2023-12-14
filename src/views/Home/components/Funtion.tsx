import { useState } from 'react'
import { FunctionTab } from './FuntionTab'
import { Swap } from './Swap'
import { Lending } from './Lending'

const Funtion = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="p-5 bg-[#fff] rounded-xl  mt-8 lg:mt-[150px] shadow-md mb-5">
      <FunctionTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 3 ? <Lending /> : <Swap />}
    </div>
  )
}

export default Funtion
