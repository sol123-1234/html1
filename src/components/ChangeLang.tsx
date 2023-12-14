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
        className="flex items-center justify-center gap-2 px-5 py-3 border-none rounded-full outline-none lg:py-5 lg:px-9 bg-primary"
      >
        {t('lang')}
      </button>
      <Modal
        visible={visible}
        content={
          <div className="text-center">
            <button
              type="button"
              className={`cursor-pointer mt-5 block outline-none rounded-3xl py-2 border-none w-full ${
                lang === 'zh-CN' && 'bg-[#f7ce46]'
              }`}
              onClick={() => onSet('zh-CN')}
            >
              中文
            </button>
            <button
              type="button"
              className={`cursor-pointer mt-5 block outline-none rounded-3xl py-2  border-none w-full ${
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
