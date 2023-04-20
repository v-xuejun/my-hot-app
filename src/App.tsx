
import { RouteConfig, routes } from '@/router/router'
import { Navigate, Route, Routes } from 'react-router-dom'
import RouterGurad from './views/RouterGurad'
function App() {
  const RouteAuthFun = (routeList: any[]) => {
    return routeList.map((s: RouteConfig) => {
      return (
        // <Route path={s.path} element={s.element} key={s.path}>
        <Route path={s.path} element={<RouterGurad auth={s.meta?.auth}>{s.element}</RouterGurad>} key={s.path}>
          {/* 递归调用，因为可能存在多级的路由 */}
          {s.children && RouteAuthFun(s.children)}
        </Route>
      )
    })
  }
  return (
    <Routes>{RouteAuthFun(routes)}</Routes>
  )
}

export default App
