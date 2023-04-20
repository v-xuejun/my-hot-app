import { CapsuleTabs, List, Tag } from 'antd-mobile'
import { hotTabs, HotNewsEnum, HotNewsInterface } from '@/utils/hot'
import { GetHotList } from '@/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from '@/utils/commonHelp'
// import Header from '@/containers/Header'

const Home = () => {
  const [hotData, setHotData] = useState<HotNewsInterface[]>([])

  const initData = async (value: HotNewsEnum) => {
    const list = await GetHotList(value)
    setHotData(list)
  }
  //使用了 `useEffect` 钩子来发送请求。由于第二个参数为空数组，因此这个 effect 只会在组件加载完成后执行一次
  useEffect(() => {
    initData(HotNewsEnum.ITInfo)
  }, [])

  const handleChange = async (value: string) => {
    initData(value as HotNewsEnum)
  }

  const renderTag = (index: number) => {
    if (index + 1 <= 3) {
      return (
        <Tag className='!bg-red-500 !border-red-500'>{index + 1}</Tag>
      )
    }
    return (
      <span className='text-red-500'>{index + 1}</span>
    )
  }

  return (
    <>
      {/* <Header></Header> */}
      <div className="home flex-1 overflow-y-auto">
        <CapsuleTabs onChange={handleChange}>
          {
            hotTabs.map(s => (
              <CapsuleTabs.Tab title={s.title} key={s.key}>
                <List>
                  {
                    hotData.map((item, index) => (
                      <Link to={isMobile ? item.mobilUrl : item.url} key={index} target="_blank" className='no-underline'>
                        <List.Item
                          key={index}
                          prefix={
                            renderTag(index)
                          }
                          extra={
                            <span className='text-red-500'>{item.hot}</span>
                          }
                        >
                          {item.name || item.title}
                        </List.Item>
                      </Link>
                    ))
                  }
                </List>
              </CapsuleTabs.Tab>
            ))
          }
        </CapsuleTabs>
      </div>

      {/* <Link replace to={'/user'} state={{ id: 'xxxx' }}>跳转</Link><br />
      <Link to={{
        pathname: '/user',
        search: 'name=john',
      }}>John</Link> */}
    </>
  )
}
export default Home