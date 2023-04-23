import {
  useLoaderData,
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useState } from 'react'
import { NavBar } from 'antd-mobile'

const Details = () => {
  // const loader = useLoaderData()
  // const para = useParams()
  // console.log(loader, para, useLocation(), 'loader')
  // const [visible, setVisible] = useState(true)
  // const sleep = () => new Promise((r) => setTimeout(r, 1000))

  const navigate = useNavigate() // 声明式导航
  const back = () => {
    navigate('/user')
  }
  return (
    <div className="w-full h-full flex flex-col">
      <NavBar onBack={back}>详情</NavBar>
      <div className="flex-1">休息休息</div>
    </div>
  )
}

export default Details
