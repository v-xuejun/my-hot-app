
import React from 'react'
import { useLocation, useParams, useNavigate, NavigateFunction } from 'react-router-dom'

// interface extends A,B,C
// interface IRouteProps<Params = any, State = any> {
//   location: State
//   params: Params
//   navigate: NavigateFunction
// }

export type IRouteProps<Params = any, State = any> = {
  location: State
  params: Params
  navigate: NavigateFunction
}

export const WithRouter = <P extends IRouteProps>(Child: React.ComponentClass<P>) => {
  return (props: Omit<P, keyof IRouteProps>) => {
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    return <Child {...props as P} navigate={navigate} params={params} location={location} ></Child>
  }
}
