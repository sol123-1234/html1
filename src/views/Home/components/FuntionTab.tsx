import { useTranslation } from 'react-i18next'

export const FunctionTab: React.FC<{
  selectedTab: number
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}> = ({ selectedTab, setSelectedTab }) => {
  const { t } = useTranslation()

  const tabs = [
    {
      id: 0,
      name: t('Swap'),
    },
    {
      id: 1,
      name: t('Mint'),
    },
    {
      id: 2,
      name: t('Redeem'),
    },
    {
      id: 3,
      name: t('Lending'),
    },
  ]
  return (
    <div className="bg-[#292929] text-base lg:text-xl p-1 lg:p-2 rounded-xl justify-between flex items-center">
      {tabs.map((item) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          onClick={() => setSelectedTab(item.id)}
          className={`flex-1 text-center py-3 bg-none outline-none ${
            selectedTab === item.id && 'bg-primary rounded-xl text-[#000]'
          }`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
