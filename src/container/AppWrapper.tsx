import { ToastContainer } from 'react-toastify'
import { Outlet, useMatches } from 'react-router-dom'
import { useEffect } from 'react'
import useLocal from '@/hooks/useLocal'
import Header from '@/components/Header'

export const AppWrapper: React.FC<React.PropsWithChildren> = () => {
  // 双语
  useLocal()

  const matches = useMatches()

  useEffect(() => {
    console.info('matches', matches[1]) // vue router meta
  }, [matches])

  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  )
}
