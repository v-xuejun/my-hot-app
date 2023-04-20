import { Card, PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { useState } from 'react'
import { getDaySmile } from '@/api'
import { sleep } from '@/utils/commonHelp'
// import Header from '@/containers/Header'

interface dataType {
  id: string
  joke: string
  title: string
}

const Humorous = () => {
  const [data, setData] = useState<dataType[]>([])
  const [hasMore, setHasMore] = useState(true)

  let count = 0

  async function mockRequest() {
    if (count >= 2) {
      return []
    }
    count++
    const result = await getDaySmile()
    return [result]
  }

  async function loadMore() {
    const result = await mockRequest()
    setData(val => [...val, ...result])
    setHasMore(data.length < 60)
  }

  // 下拉刷新
  async function getNextData() {
    setData([])
    await sleep(300)
    const result = await mockRequest()
    setData(val => [...val, ...result])
  }

  return (
    <>
      {/* <Header></Header> */}
      <div className="flex-1 overflow-y-auto">
        <PullToRefresh onRefresh={getNextData} refreshingText=''>
          <div className='flex flex-col items-center justify-center'>
            {
              data.map(item => (
                <Card key={item.id} title={item.title} className='mt-5 w-11/12 shadow-card bg-purple-200 overflow-hidden'>
                  <div className='px-1 leading-7 text-gray-33'>{item.joke}</div>
                </Card>
              ))
            }
          </div>
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </>
  )
}
export default Humorous