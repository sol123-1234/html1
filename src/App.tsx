import React from 'react'
import { RouterProvider } from 'react-router-dom'
import Web3Wrapper from './container/Web3Wrapper'
import ReactQueryWrapper from './container/ReactQueryWrapper'
import router from './router'

function App() {
  return (
    <React.Suspense fallback={<div />}>
      <Web3Wrapper>
        <ReactQueryWrapper>
          <RouterProvider router={router} />
        </ReactQueryWrapper>
      </Web3Wrapper>
    </React.Suspense>
  )
}

export default App
