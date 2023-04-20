import { useState } from 'react'
import { InfiniteScroll, Card } from 'antd-mobile'
import { getEmotional, getExciting } from '@/api/index'
// import Header from '@/containers/Header'

interface dataType {
  id: string
  ishan: string
}

export default () => {
  const [data, setData] = useState<dataType[]>([])
  const [hasMore, setHasMore] = useState(true)
  let count = 0
  async function mockRequest(action = 'down') {
    if (count >= 5) {
      return []
    }
    count++
    let result: any
    if (action === 'down') {
      result = await getEmotional()
    } else {
      result = await getExciting()
    }
    return [result]
  }

  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(data.length < 100)
  }

  return (
    <>
      {/* <Header></Header> */}
      <div className="flex-1 overflow-y-auto">
        <div className='flex flex-col items-center justify-center'>
          {
            data.map(item => (
              <Card key={item.id} className='mt-4 w-11/12 shadow-card  overflow-hidden bg-fuchsia-200'>
                <div className='px-1 leading-8 text-gray-33'>{item.ishan}</div>
              </Card>
            ))
          }
        </div>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  )
}