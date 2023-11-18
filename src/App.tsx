'use client'

import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Web3Wrapper from './container/Web3Wrapper'
import ReactQueryWrapper from './container/ReactQueryWrapper'
import router from './router'
import SuspenseLoading from './components/SuspenseLoading'

function App() {
  return (
    <React.Suspense fallback={<SuspenseLoading />}>
      <Web3Wrapper>
        <ReactQueryWrapper>
          <RouterProvider router={router} />
        </ReactQueryWrapper>
      </Web3Wrapper>
    </React.Suspense>
  )
}

export default App
