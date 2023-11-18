import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
/**
 * @function useResize 使用的类型
 */
export type defRC = {
  default: React.ComponentType<any>
}
/**
 * 类似 React.lazy，实现组件懒加载
 * @param callback 返回 Promise 的函数
 * @returns JSX
 */
export default function LazyLoadRoutes(callback: () => Promise<defRC>) {
  const LazyComp = React.lazy(callback)
  return (
    <ErrorBoundary fallback={<Error />}>
      <LazyComp />
    </ErrorBoundary>
  )
}

const Error = () => {
  const { t } = useTranslation()
  return <div className="flex items-center justify-center w-screen h-full">{t('Something went wrong')}</div>
}
