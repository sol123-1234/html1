import { ToastContainer } from 'react-toastify'
import { Outlet, useMatches } from 'react-router-dom'
import { useEffect } from 'react'
import useLocal from '@/hooks/useLocal'

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
      <div className="px-3.5 py-5">
        <Outlet />
      </div>
    </>
  )
}
