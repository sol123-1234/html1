import { SpinLoading } from 'antd-mobile'

const SuspenseLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SpinLoading
        className="text-theme-primary"
        style={{
          '--color': '#74f878',
          '--size': '40px',
        }}
      />
    </div>
  )
}

export default SuspenseLoading
