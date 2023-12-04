import React, { useState } from 'react'
import { Address, useAccount, useBalance } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { isEqual } from 'lodash'
import { Button, Input, SpinLoading, Toast } from 'antd-mobile'
import exchange from '@/assets/swapChange.png'
import useUsdt from '@/hooks/useUsdt'
import useAusd from '@/hooks/useAusd'
import useTokenApproval from '@/hooks/useTokenApproval'
import { getSwapAddress } from '@/utils/addressHelpers'
import useExchangeToA from '@/hooks/useExchangeToA'
import useExchangeToU from '@/hooks/useExchangeToU'
import { toWei } from '@/utils/formatBalance'

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

type TokenData = ReturnType<typeof useAusd>

const swapAddress = getSwapAddress()

const Swap = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const [selectedTab, setSelectedTab] = useState(0)

  const usdtData = useUsdt()
  const ausdData = useAusd()

  const [dependenceAddress, setDependenceAddress] = useState<Address>(usdtData.address)
  const [, setIndependenceAddress] = useState<Address>(ausdData.address)

  const dependenceField = dependenceAddress === usdtData.address ? usdtData : ausdData
  const independenceField = dependenceAddress === usdtData.address ? ausdData : usdtData

  const {
    isVaultApproved: usdtIsApprove,
    approveLoading: usdtApproving,
    handleApprove: usdtApprove,
  } = useTokenApproval(usdtData.address, swapAddress)
  const {
    isVaultApproved: ausdIsApprove,
    approveLoading: ausdApproving,
    handleApprove: ausdApprove,
  } = useTokenApproval(ausdData.address, swapAddress)

  const { exchangeToA, exchangeToALoading } = useExchangeToA()
  const { exchangeToU, exchangeToULoading } = useExchangeToU()

  const dependenceIsUsdt = isEqual(dependenceField, usdtData)

  const dependenceIsApprove = dependenceIsUsdt ? usdtIsApprove : ausdIsApprove

  const [amount, setAmount] = useState('')

  const onClick = async () => {
    if (!isConnected) {
      openConnectModal()
      return
    }
    if (dependenceIsUsdt && !usdtIsApprove) {
      await usdtApprove()
      return
    }
    if (!dependenceIsUsdt && !ausdIsApprove) {
      await ausdApprove()
      return
    }
    await swap()
  }

  // eslint-disable-next-line consistent-return
  const swap = async () => {
    if (amount > dependenceField.formatted) {
      return Toast.show(`${dependenceField.symbol}余额不足`)
    }

    if (dependenceIsUsdt) {
      await exchangeToA(toWei(amount, usdtData.decimals))
    } else {
      await exchangeToU(toWei(amount, ausdData.decimals))
    }
  }

  const changeToken = () => {
    setIndependenceAddress(dependenceField.address)
    setDependenceAddress(independenceField.address)
  }
  return (
    <div className="p-5 bg-[#fff] rounded-xl  mt-8 lg:mt-[150px] shadow-md mb-5">
      <SwapTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <InputField token={dependenceField} className="mt-5" value={amount} setValue={setAmount} />
      <div className="flex justify-end">
        <button type="button" className="pr-5 -mt-2 bg-transparent border-none outline-none" onClick={changeToken}>
          <img className="w-7 lg:w-10" src={exchange} alt="" />
        </button>
      </div>
      <InputField token={independenceField} className="-mt-3" value={amount} setValue={setAmount} />
      <div className="flex items-center justify-between text-sm lg:text-base text-[#333333] mt-4 lg:mt-8">
        <div>结算期</div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center justify-center px-1 bg-primary rounded-xl">即时</div>
          <div>～30s</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm lg:text-base text-[#8f8c8c] mt-4 lg:mt-8">
        <div>池子AUSD余额</div>
        <div className="flex items-center justify-end gap-2">
          <div>{ausdData.poolBalance}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm lg:text-base text-[#8f8c8c] mt-2 lg:mt-8">
        <div>池子USDT余额</div>
        <div className="flex items-center justify-end gap-2">
          <div>{usdtData.poolBalance}</div>
        </div>
      </div>
      <div className="mt-4 lg:mt-8">
        <Button
          loading={ausdApproving || usdtApproving || exchangeToALoading || exchangeToULoading}
          block
          size="large"
          type="button"
          onClick={onClick}
          style={{
            '--background-color': '#f7ce46',
            '--border-radius': '12px',
          }}
        >
          {isConnected ? (!dependenceIsApprove ? '授权' : '闪兑') : '链接钱包'}
        </Button>
      </div>
    </div>
  )
}

const SwapTab: React.FC<{ selectedTab: number; setSelectedTab: React.Dispatch<React.SetStateAction<number>> }> = ({
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="bg-[#292929] text-sm lg:text-xl p-1 lg:p-2 rounded-xl justify-between flex items-center">
      {tabs.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          onClick={() => setSelectedTab(item.id)}
          className={`flex-1 text-center py-3 bg-none outline-none ${
            selectedTab === item.id && 'bg-primary rounded-xl text-[#000]'
          }`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

const InputField: React.FC<{
  token: TokenData
  className?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}> = ({ token, className, value, setValue }) => {
  return (
    <div className={`bg-[#f0f0f0] p-5 rounded-xl ${className || ''}`}>
      <div className=" text-[#616060] text-sm lg:text-base">余额： {token?.formatted || 0}</div>
      <div className="flex items-center justify-between mt-2">
        <Input
          type="number"
          className="flex-1 bg-transparent outline-none"
          value={value}
          onChange={(e) => setValue(e)}
        />
        <div className="flex items-center gap-2">
          {token.isLoading ? (
            <SpinLoading />
          ) : (
            <>
              <img className="w-4 lg:w-[22px]" src={token.icon} alt="" />
              <div className="text-[#292929] text-sm lg:text-xl">{token?.symbol || ''}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Swap
