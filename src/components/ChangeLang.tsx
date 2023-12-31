import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd-mobile'
import useLocal from '@/hooks/useLocal'

const ChangeLang: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const { setLang, getLang } = useLocal()
  const lang = getLang()

  const onSet = (langStr: string) => {
    setLang(langStr)
    setVisible(false)
  }
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVisible(true)
        }}
        className="flex h lg:text-xl items-center justify-center text-[#000] gap-2 px-5  border-none rounded-full outline-none py-3 lg:px-9 bg-primary"
      >
        {t('lang')}
      </button>
      <Modal
        visible={visible}
        content={
          <div className="text-center text-[#000]">
            <button
              type="button"
              className={`cursor-pointer mt-5 text-[#000] block outline-none rounded-3xl lg:text-xl py-2 border-none w-full ${
                lang === 'zh-CN' && 'bg-[#f7ce46]'
              }`}
              onClick={() => onSet('zh-CN')}
            >
              中文
            </button>
            <button
              type="button"
              className={`cursor-pointer mt-5 text-[#000] block outline-none rounded-3xl lg:text-xl py-2  border-none w-full ${
                lang === 'en-US' && 'bg-[#f7ce46]'
              }`}
              onClick={() => onSet('en-US')}
            >
              English
            </button>
          </div>
        }
        closeOnAction
        closeOnMaskClick
        onClose={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

export default ChangeLang
