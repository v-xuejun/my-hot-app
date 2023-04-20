import { useEffect } from 'react'
import { useLocation, useNavigate, matchRoutes } from 'react-router-dom'
import { routes } from '@/router/router'
import { useAppSelector } from '@/store/hook'

// 路由守卫
export const RouterGurad = ({ children, auth }: any) => {
  const loaction = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('_token')
  const mathchs = matchRoutes(routes, location)
  const isExist = mathchs?.some((s) => s.pathname === loaction.pathname)
  const loginState = useAppSelector((state) => {
    return state.userInfo.loginState
  })
  // console.log(loginState, 'loginState')
  useEffect(() => {
    //token 不存在或未登录
    // if (auth && (!token || !loginState)) {
    if (auth && !token) {
      navigate('/login')
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态 && loginState
    if (token && isExist) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (location.pathname == '/' || location.pathname == '/login') {
        navigate('/home')
      } else {
        // 如果是其他路由就跳到其他的路由
        navigate(location.pathname)
      }
    }
  }, [token, loaction.pathname, routes])
  return children
}

export default RouterGurad
