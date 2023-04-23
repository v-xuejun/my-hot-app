import { lazy } from 'react'
import Layout from '@/views/Layout'

const App = lazy(() => import('@/App1'))
const Home = lazy(() => import('@/views/Home'))
const Lover = lazy(() => import('@/views/Lover'))
const Humorous = lazy(() => import('@/views/Humorous'))
const User = lazy(() => import('@/views/User'))
const NoMatch = lazy(() => import('@/views/NoMatch'))
// const Login = lazy(() => import('@/views/Login'))
// const Details = lazy(() => import('@/views/Details'))
import Login from '@/views/Login'
import Details from '@/views/Details'

export interface RouteMeta extends Record<string | number | symbol, any> {}

export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
  meta?: RouteMeta
  caseSensitive?: boolean
}

export const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      auth: false
    }
  },
  {
    path: '/',
    element: <Layout />,
    meta: {
      title: '首页',
      auth: true
    },
    children: [
      // {
      //   path: '/',
      //   element: <Navigate replace to="/home" />
      // },
      {
        path: '/home',
        element: <Home />,
        meta: {
          title: '每日看点',
          auth: true
        }
      },
      {
        path: '/humorous',
        element: <Humorous />,
        meta: {
          title: '幽默笑话',
          auth: true
        }
      },
      {
        path: '/lover',
        element: <Lover />,
        meta: {
          title: '开心一笑',
          auth: true
        }
      },
      {
        path: '/user',
        element: <User />,
        meta: {
          title: '我的',
          auth: true
        }
      }
    ]
  },
  {
    path: '/details',
    element: <Details />,
    meta: {
      title: '详情',
      auth: true
    }
  },
  {
    path: '*',
    element: <NoMatch />,
    meta: {
      title: '404',
      auth: true
    }
  }
]
