import { Location, NavigateFunction, RouteObject, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import React, { Suspense, useEffect, useState } from 'react'
import { routes } from './router'
import { useAppSelector } from '@/store/hook'

export interface RouteMeta extends Record<string | number | symbol, any> { }

// export type RouteConfig = RouteObject & {
//   meta?: RouteMeta
//   errorElement?: React.ReactNode
//   children?: RouteConfig[]
// }
export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
  meta?: RouteMeta
  caseSensitive?: boolean
}
// 根据路径获取路由
function searchRoute(path: string, routes: RouteConfig[]): RouteConfig | null {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      return searchRoute(path, item.children)
    }
  }
  return null
}

// 路由守卫
export const RouterGurad = (auth: boolean) => {
  const loaction = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('_token')
  const mathchs = matchRoutes(routes, location);
  const isExist = mathchs?.some(s => s.pathname === loaction.pathname)
  const loginState = useAppSelector((state) => {
    return state.userInfo.loginState
  })

  useEffect(() => {
    //token 不存在
    if (!token && auth) {
      navigate('/login')
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist && loginState) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (location.pathname == "/" || location.pathname == "/login") {
        navigate("/home");
      } else {
        // 如果是其他路由就跳到其他的路由
        navigate(location.pathname)
      }
    }
  }, [token, loaction.pathname, routes])

}

//全局路由守卫
export function guard(
  location: Location, navigate: NavigateFunction, routes: RouteConfig[]
) {
  const { pathname } = location
  // 查询对应的路由，是否有权限控制
  const findRoute = searchRoute(pathname, routes)
  if (!findRoute) {
    //未找到路由
    // navigate('/404')
    return false
  }
  if (findRoute.meta?.auth) {
    const token = localStorage.getItem('_token')
    //判断token 是否过期等
    if (!token) {
      // return navigate('/login')
      navigate(-1)
      return false
    }
  }
  return true
}