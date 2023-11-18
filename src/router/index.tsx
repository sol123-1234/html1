import { createBrowserRouter } from 'react-router-dom'
import lazyLoadRoutes from '@/components/LazyLoadRoutes'
import { AppWrapper } from '@/container/AppWrapper'

const router = createBrowserRouter([
  {
    path: '/',
    // 重定向
    element: <AppWrapper />,
    children: [
      {
        path: '',
        element: lazyLoadRoutes(() => import('@/views/Home/Home')),
        // vue router meta
        handle: {
          name: 'home',
        },
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
])

export default router
