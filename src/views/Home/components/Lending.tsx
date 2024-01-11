import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, Input, Modal, SpinLoading, Toast } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useAusd from '@/hooks/useAusd'
import { formatNumber } from '@/utils/formatBalance'
import { getMubiAddress, getUsdtAddress, getWbtcAddress } from '@/utils/addressHelpers'
import useMyToken from '@/hooks/useMyToken'
import useEth from '@/hooks/useEth'

type AusdTokenData = ReturnType<typeof useAusd>
type TokenData = ReturnType<typeof useMyToken>
export const Lending = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

  const ausdData = useAusd()

  const eth = useEth()
  const usdt = useMyToken(getUsdtAddress())
  const mubi = useMyToken(getMubiAddress())
  const wbtc = useMyToken(getWbtcAddress())

  const tokenList = [eth, wbtc, mubi, usdt]

  const dependenceField = ausdData
  const [independenceField, setIndependenceField] = useState(usdt)

  const [amount, setAmount] = useState('')

  const onClick = async () => {
    if (!isConnected) {
      openConnectModal()
    } else {
      commingSoon()
    }
  }
  const onSetToken = (token: TokenData) => {
    setIndependenceField(token)
    setVisible(false)
  }

  const commingSoon = () => {
    Toast.show('commming soon')
  }

  return (
    <div>
      <InputField
        commingSoon={commingSoon}
        select
        setVisible={setVisible}
        token={independenceField}
        value={amount}
        setValue={setAmount}
        className="mt-5"
      />
      <div className="flex justify-end">
        <div className="pr-5 bg-transparent border-none outline-none h-9" />
      </div>
      <InputField
        commingSoon={commingSoon}
        token={dependenceField}
        className="-mt-3"
        value={amount}
        setValue={setAmount}
      />
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
      <div className="mt-4 lg:mt-8">
        <Button
          block
          size="large"
          type="button"
          onClick={onClick}
          style={{
            '--background-color': '#f7ce46',
            '--border-radius': '12px',
          }}
        >
          {isConnected ? t('Lending') : t('Connect Wallet')}
        </Button>
      </div>
      <Modal
        visible={visible}
        content={
          <div>
            {tokenList.map((item) => (
              <button
                type="button"
                key={item.address}
                className="flex items-center w-full my-3 gap-x-4 "
                onClick={() => onSetToken(item)}
              >
                <img src={item.iconPath ?? ''} alt="" className="w-4 lg:w-[24px] mr-5" />
                <div className="text-[#292929] text-base lg:text-xl">{item.symbol ?? ''}</div>
              </button>
            ))}
          </div>
        }
        closeOnAction
        closeOnMaskClick
        onClose={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

const InputField: React.FC<{
  select?: boolean
  commingSoon: () => void
  token: TokenData | AusdTokenData
  className?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ token, className, value, setValue, commingSoon, select = false, setVisible = null }) => {
  const { t } = useTranslation()

  const handleOpenSelect = () => {
    if (!select) return
    setVisible?.(true)
  }

  const onChange = () => {
    commingSoon()
    setValue('')
  }

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
          onChange={() => onChange()}
        />
        <div className="flex items-center gap-2">
          {token.isLoading ? (
            <SpinLoading />
          ) : (
            <button type="button" className="flex items-center gap-2" onClick={() => handleOpenSelect()}>
              <img
                className="w-4 lg:w-[24px]"
                src={(token as AusdTokenData)?.icon || (token as TokenData)?.iconPath}
                alt=""
              />
              <div className="text-[#292929] text-base lg:text-xl">{token?.symbol || ''}</div>
              {select && <div className="triangle" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
