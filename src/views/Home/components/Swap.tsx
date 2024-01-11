import React, { useEffect, useMemo, useState } from 'react'
import { Address, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { isEqual } from 'lodash'
import { Button, Input, Modal, SpinLoading, Toast } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import BigNumber from 'bignumber.js'
import exchange from '@/assets/swapChange.png'
import useUsdt from '@/hooks/useUsdt'
import useAusd from '@/hooks/useAusd'
import useTokenApproval from '@/hooks/useTokenApproval'
import { getAusdAddress, getCoinbaseAddress, getSwapAddress, getUsdtAddress } from '@/utils/addressHelpers'
import useExchangeToA from '@/hooks/useExchangeToA'
import useExchangeToU from '@/hooks/useExchangeToU'
import { formatNumber, toWei } from '@/utils/formatBalance'
import useMyToken from '@/hooks/useMyToken'

type MyTokenData = ReturnType<typeof useMyToken>

const swapAddress = getSwapAddress()

export const Swap = () => {
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const [isDependence, setIsDependence] = useState(true)

  const usdtData = useUsdt()
  const ausdData = useAusd()

  // const dependenceField = dependenceAddress === usdtData.address ? usdtData : ausdData
  // const independenceField = dependenceAddress === usdtData.address ? ausdData : usdtData

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

  const usdt = useMyToken(getUsdtAddress())
  const coinbase = useMyToken(getCoinbaseAddress())
  const ausd = useMyToken(getAusdAddress())

  const [dependenceFieldAddress, setDependenceAFieldAddress] = useState<Address>(ausd.address)
  const [independenceFieldAddress, setIndependenceFieldAddress] = useState<Address>(usdt.address)

  const tokenList = [ausd, usdt, coinbase]

  const dependenceField = tokenList.filter((token) => isEqual(dependenceFieldAddress, token?.address))[0]
  const independenceField = tokenList.filter((token) => isEqual(independenceFieldAddress, token?.address))[0]

  const dependenceIsUsdt = isEqual(dependenceField?.address, usdtData.address)

  const dependenceIsApprove = dependenceIsUsdt ? usdtIsApprove : ausdIsApprove

  const [amount, setAmount] = useState('')

  const haveCoinBase =
    isEqual(dependenceField?.address, getCoinbaseAddress()) || isEqual(independenceField?.address, getCoinbaseAddress())
  const haveAusd =
    isEqual(dependenceField?.address, getAusdAddress()) || isEqual(independenceField?.address, getAusdAddress())
  const haveUsdt =
    isEqual(dependenceField?.address, getUsdtAddress()) || isEqual(independenceField?.address, getUsdtAddress())
  const onClick = async () => {
    if (!isConnected) {
      openConnectModal()
      return
    }
    if (haveCoinBase) {
      Toast.show('commming soon')
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

  const onSetToken = (token: MyTokenData) => {
    if (dependenceField.address === token.address || independenceField.address === token.address) {
      changeToken()
      setAmount('')
      setVisible(false)
      return
    }
    if (isDependence) {
      if (dependenceField.address === token.address) return
      setDependenceAFieldAddress(token.address)
    } else {
      if (independenceField.address === token.address) return
      setIndependenceFieldAddress(token.address)
    }

    setAmount('')
    setVisible(false)
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
    setIndependenceFieldAddress(dependenceField.address)
    setDependenceAFieldAddress(independenceField.address)
  }

  return (
    <div>
      <InputField
        setDependence={() => setIsDependence(true)}
        haveCoinBase={haveCoinBase}
        select
        token={dependenceField}
        className="mt-5"
        value={amount}
        setValue={setAmount}
        setVisible={setVisible}
      />
      <div className="flex justify-end">
        <button type="button" className="pr-5 -mt-2 bg-transparent border-none outline-none" onClick={changeToken}>
          <img className="w-7 lg:w-10" src={exchange} alt="" />
        </button>
      </div>
      <InputField
        setDependence={() => setIsDependence(false)}
        haveCoinBase={haveCoinBase}
        select
        token={independenceField}
        className="-mt-3"
        value={amount}
        setValue={setAmount}
        setVisible={setVisible}
      />
      <div className="flex items-center justify-between text-lg text-[#333333] mt-4 lg:mt-8">
        <div>{t('Settlement Time')}</div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center justify-center px-1 bg-primary rounded-xl">{t('Instant')}</div>
          <div>～30s</div>
        </div>
      </div>
      {haveAusd && (
        <div className="flex items-center justify-between mt-4 text-lg text-black lg:text-lg lg:mt-8 flex-nowrap">
          <div>{t('Pool AUSD Balance')}</div>
          <div className="flex items-center justify-end gap-2 ">
            <div>{ausdData.poolBalance}</div>
          </div>
        </div>
      )}
      {haveUsdt && (
        <div className="flex items-center justify-between mt-2 text-lg text-black lg:text-lg lg:mt-8 flex-nowrap">
          <div>{t('Pool USDT Balance')}</div>
          <div className="flex items-center justify-end gap-2 ">
            <div>{usdtData.poolBalance}</div>
          </div>
        </div>
      )}
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
      <Modal
        visible={visible}
        content={
          <div>
            {tokenList.map((item, index) => (
              <button
                key={index}
                type="button"
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
  haveCoinBase: boolean
  select?: boolean
  token: MyTokenData
  className?: string
  value: string
  setDependence: () => void
  setValue: React.Dispatch<React.SetStateAction<string>>
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ token, className, value, setValue, setDependence, haveCoinBase, select = false, setVisible = null }) => {
  const { t } = useTranslation()
  const [formatted, setFormateed] = useState(token?.formatted || '0')
  const { address } = useAccount()

  useEffect(() => {
    setFormateed(token?.formatted || '0')
  }, [token, address])

  const handleOpenSelect = () => {
    if (!select) return
    setVisible?.(true)
    setDependence()
  }

  const dsr: BigNumber = useMemo(() => {
    return BigNumber('1000000001547125957863212448').div(10 ** 27)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timer = null

    if (isEqual(token?.address, getAusdAddress())) {
      timer = setInterval(() => {
        if (formatted !== '0') {
          setFormateed((currentBalance: string) => {
            const n = Number(BigNumber(currentBalance).times(dsr).valueOf())
            // eslint-disable-next-line no-restricted-globals
            return isNaN(n) ? '0' : n.toFixed(18).valueOf()
          })
        }
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [token?.address, formatted, dsr])

  const setAmount = (e: string) => {
    if (haveCoinBase) {
      Toast.show('commming soon')
    } else {
      setValue(e)
    }
  }

  return (
    <div className={`bg-[#f0f0f0] p-5 rounded-xl ${className || ''}`}>
      <div className="text-lg text-black">
        {t('Balance')}： {formatNumber(formatted || '0', 0, 14)}
      </div>
      <div className="flex items-center justify-between mt-2">
        <Input
          type="number"
          className="flex-1 mt-2 bg-transparent outline-none"
          value={value}
          onChange={(e) => setAmount(e)}
        />
        <div className="flex items-center gap-2">
          {token?.isLoading ? (
            <SpinLoading />
          ) : (
            <button type="button" className="flex items-center gap-2" onClick={() => handleOpenSelect()}>
              <img className="w-4 lg:w-[24px]" src={token?.iconPath} alt="" />
              <div className="text-[#292929] text-base lg:text-xl">{token?.symbol || ''}</div>
              {select && <div className="triangle" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
