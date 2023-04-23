import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Form, Input, Toast, Button } from 'antd-mobile'
import {
  CloseOutline,
  EyeInvisibleOutline,
  EyeOutline
} from 'antd-mobile-icons'
import store from '@/store'
import { ActionAvatar } from '@/store/actionTypes'
import { sleep } from '@/utils/commonHelp'
import MSStrorage from '@/utils/msStorage'

const Login = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const handleClose = () => {
    Toast.show('退出App')
  }

  // 非下划线的单词字符 + 2个以上单词字符 + @ + 2位以上单词字符域名 + .2位以上小写字母做域名后缀 + (.2位以上二重域名后缀)?
  // var reg = /^(用户名)@(组织名)\.(一级域名后缀)(二级域名后缀)?$/
  const reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
  const checkEmail = (_: any, value: string) => {
    if (value) {
      if (reg.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject(new Error('邮箱格式不正确!'))
      }
    }
    return Promise.reject(new Error('邮箱不能为空!'))
  }
  const onFinish = async (values: any) => {
    store.dispatch({
      type: ActionAvatar.LOGIN_REFRESH
    })
    MSStrorage.instance.setItem('_token', '_token', { expires: 5, unit: 'm' })
    MSStrorage.instance.setItem('userInfo', values, { expires: 5, unit: 'm' })
    await sleep(200)
    navigate('/home')
  }

  return (
    <div className="w-full h-full flex flex-col px-5">
      <div className="relative h-11 flex items-center justify-center text-base">
        登录
        <div className="absolute top-1 right-2 p-1" onClick={handleClose}>
          <CloseOutline fontSize={18} />
        </div>
      </div>
      <div className="mt-20 myForm">
        <Form
          layout="horizontal"
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" size="large">
              登录
            </Button>
          }>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input placeholder="邮箱/手机号" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="userEmail"
            rules={[{ required: true, type: 'email', validator: checkEmail }]}>
            <div className="flex items-center">
              <Input
                className="flex-auto"
                placeholder="请输入密码"
                type={visible ? 'text' : 'password'}
              />
              <div className="flex-none cursor-pointer p-1">
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="flex items-center justify-between px-5 mt-4">
        <span>忘记密码?</span>
        <span>手机登录</span>
      </div>
    </div>
  )
}

export default Login
