
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import App from '@/App1'
import Home from '@/views/Home'
import Lover from '@/views/Lover'
import Humorous from '@/views/Humorous'
import User from '@/views/User'
import NoMatch from '@/views/NoMatch'
import Login from '@/views/Login'
import Details from '@/views/Details'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      /** 避免根目录下<Outlet />没有任何东西可以渲，可以将索引路由视为填充该空间的默认子路由 */
      // {
      //   index: true,
      //   element: <Home />,
      // },
      /** 重定向 */
      {
        path: '/',
        element: <Navigate replace to="/home" />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'humorous',
        element: <Humorous />
      },
      {
        path: 'lover',
        element: <Lover />
      },
      {
        path: 'user',
        element: <User />
      },
    ]
  },
  {
    path: 'login',
    loader: () => {
      return {
        id: '123',
        name: 'gxj'
      }
    },
    id: 'login12321',
    element: <Login />
  },
  {
    path: 'details',
    element: <Details />
  }
])
export default route