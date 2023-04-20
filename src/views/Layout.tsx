import Footer from '@/components/Footer'
import Header from '@/containers/Header'
import { SpinLoading, WaterMark } from 'antd-mobile'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import dayjs from 'dayjs'
import Skeleton from './Skeleton'

export default () => {
  return (
    <>
      <WaterMark content={dayjs().format('YYYY-MM-DD')}></WaterMark>
      <div className="w-full h-full flex flex-col dark:bg-dark-300">
        <Header></Header>
        <main className="flex-1 overflow-hidden overflow-y-auto">
          <Suspense fallback={<Skeleton />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
