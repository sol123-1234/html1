import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toast } from 'antd-mobile'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Create a client

const ReactQueryWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // enabled: !!address && !!sign,
        // retry: false,
        onError: (error: any) => {
          Toast.show(error.message)
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryWrapper
