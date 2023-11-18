import React from 'react'
import useLocal from '@/hooks/useLocal'
import i18n from '@/locales/config'

const ChangeLang: React.FC = () => {
  const { setLang } = useLocal()

  const toggleI18n = () => {
    setLang(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN')
  }
  return (
    <button type="button" onClick={() => toggleI18n()}>
      <img src="/assets/images/lang.svg" className="w-4 h-4" alt="" />
    </button>
  )
}

export default ChangeLang
