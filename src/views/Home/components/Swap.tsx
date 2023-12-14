import React, { useState } from 'react'
import { Address, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { isEqual } from 'lodash'
import { Button, Input, SpinLoading, Toast } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import exchange from '@/assets/swapChange.png'
import useUsdt from '@/hooks/useUsdt'
import useAusd from '@/hooks/useAusd'
import useTokenApproval from '@/hooks/useTokenApproval'
import { getSwapAddress } from '@/utils/addressHelpers'
import useExchangeToA from '@/hooks/useExchangeToA'
import useExchangeToU from '@/hooks/useExchangeToU'
import { formatNumber, toWei } from '@/utils/formatBalance'

type TokenData = ReturnType<typeof useAusd>

const swapAddress = getSwapAddress()

export const Swap = () => {
  const { t } = useTranslation()

  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

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
      return Toast.show(`${dependenceField.symbol}${t('balance not enough')}`)
    }

    if (dependenceIsUsdt) {
      await exchangeToA(toWei(amount, usdtData.decimals))
    } else {
      await exchangeToU(toWei(amount, ausdData.decimals))
    }
    usdtData.refetch()
    ausdData.refetch()
  }

  const changeToken = () => {
    setIndependenceAddress(dependenceField.address)
    setDependenceAddress(independenceField.address)
  }
  return (
    <div>
      <InputField token={dependenceField} className="mt-5" value={amount} setValue={setAmount} />
      <div className="flex justify-end">
        <button type="button" className="pr-5 -mt-2 bg-transparent border-none outline-none" onClick={changeToken}>
          <img className="w-7 lg:w-10" src={exchange} alt="" />
        </button>
      </div>
      <InputField token={independenceField} className="-mt-3" value={amount} setValue={setAmount} />
      <div className="flex items-center justify-between text-lg text-[#333333] mt-4 lg:mt-8">
        <div>{t('Settlement Time')}</div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center justify-center px-1 bg-primary rounded-xl">{t('Instant')}</div>
          <div>～30s</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-lg text-black lg:text-lg lg:mt-8 flex-nowrap">
        <div>{t('Pool AUSD Balance')}</div>
        <div className="flex items-center justify-end gap-2 ">
          <div>{ausdData.poolBalance}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 text-lg text-black lg:text-lg lg:mt-8 flex-nowrap">
        <div>{t('Pool USDT Balance')}</div>
        <div className="flex items-center justify-end gap-2 ">
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
          {isConnected ? (!dependenceIsApprove ? t('Authorize') : t('Swap')) : t('Connect Wallet')}
        </Button>
      </div>
    </div>
  )
}

const InputField: React.FC<{
  token: TokenData
  className?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}> = ({ token, className, value, setValue }) => {
  const { t } = useTranslation()
  return (
    <div className={`bg-[#f0f0f0] p-5 rounded-xl ${className || ''}`}>
      <div className="text-lg text-black">
        {t('Balance')}： {formatNumber(token?.formatted || '0', 0, 14)}
      </div>
      <div className="flex items-center justify-between mt-2">
        <Input
          type="number"
          className="flex-1 mt-2 bg-transparent outline-none"
          value={value}
          onChange={(e) => setValue(e)}
        />
        <div className="flex items-center gap-2">
          {token.isLoading ? (
            <SpinLoading />
          ) : (
            <>
              <img className="w-4 lg:w-[24px]" src={token.icon} alt="" />
              <div className="text-[#292929] text-base lg:text-xl">{token?.symbol || ''}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
