import React, { useState } from 'react'
import b from '@/assets/b.png'

const Swap = () => {
  const [selectedTab] = useState(0)
  const tabs = [
    {
      id: 0,
      name: '闪兑',
    },
    {
      id: 1,
      name: '铸造',
    },
    {
      id: 2,
      name: '赎回',
    },
  ]
  return (
    <div className="p-5 bg-[#fff] rounded-xl  mt-8 lg:mt-[150px] shadow-md mb-5">
      <SwapTab tabs={tabs} selectedTab={selectedTab} />
      <InputField symbol="USDT" className="mt-5" />
      <InputField symbol="AUSD" className="mt-3" />
      <div className="flex items-center justify-between text-base text-[#333333] mt-8">
        <div>结算期</div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center justify-center px-1 bg-primary rounded-xl">即时</div>
          <div>～30s</div>
        </div>
      </div>
      <button
        className="border-none mt-8 w-full font-bold py-3 lg:py-4 bg-primary rounded-xl text-[#292929] text-sm lg:text-[22px]"
        type="button"
      >
        链接钱包
      </button>
    </div>
  )
}

const SwapTab: React.FC<{ tabs: any[]; selectedTab: number }> = ({ tabs, selectedTab }) => {
  return (
    <div className="bg-[#292929] text-sm lg:text-xl p-2 rounded-xl justify-between flex items-center">
      {tabs.map((item) => (
        <div
          className={`flex-1 text-center py-3 ${selectedTab === item.id && 'bg-primary rounded-xl text-[#000]'}`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

const InputField: React.FC<{ symbol: string; className?: string }> = ({ symbol, className }) => {
  return (
    <div className={`bg-[#f0f0f0] p-5 rounded-xl ${className || ''}`}>
      <div className="text-base text-[#989898]">余额： 0.00000</div>
      <div className="flex items-center justify-between mt-2">
        <input type="number" className="flex-1 bg-transparent outline-none" />
        <div className="flex items-center gap-2">
          <img className="w-[22px]" src={b} alt="" />
          <div className="text-[#292929] text-xl">{symbol}</div>
        </div>
      </div>
    </div>
  )
}

export default Swap
