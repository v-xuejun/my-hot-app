import { TabBar } from 'antd-mobile'
import { AppOutline, UserOutline, ContentOutline, SmileOutline } from 'antd-mobile-icons'
import { useLocation, useNavigate } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const navigate = useNavigate() // 声明式导航
  const { pathname } = location
  const setRouteActive = (value: string) => {
    navigate(value)
  }


  const tabs = [
    {
      key: '/home',
      title: '热搜',
      icon: <AppOutline />
    },
    {
      key: '/humorous',
      title: '幽默',
      icon: <SmileOutline />
    },
    {
      key: '/lover',
      title: '一句话',
      icon: <ContentOutline />
    },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <div className='h-14 border-t border-t-gray-200 py-1'>
      <TabBar activeKey={pathname} onChange={setRouteActive}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}