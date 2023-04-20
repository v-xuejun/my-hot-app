import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  List,
  Ellipsis,
  Toast,
  ImageViewer,
  Button,
  ActionSheet,
  Dialog,
  Popup,
  CheckList
} from 'antd-mobile'
import { useEffect, useMemo, useState } from 'react'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import {
  SetOutline,
  UserSetOutline,
  AppstoreOutline,
  ContentOutline,
  LoopOutline,
  LockOutline
} from 'antd-mobile-icons'
import { getUserInfo } from '@/store/action'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { ActionAvatar } from '@/store/actionTypes'
import { sleep } from '@/utils/commonHelp'
import { handleSettingTheme } from '@/utils'
import MSStrorage from '@/utils/msStorage'

const User = () => {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => {
    return state.userInfo
  })

  useEffect(() => {
    // ts
    dispatch(getUserInfo())
  }, [])

  const avatarUrl = useMemo(() => userInfo.avatarUrl, [userInfo])
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  const [showPopup, setShowPopup] = useState(false)

  const demoImages = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80'
  ]
  const navigate = useNavigate() // 声明式导航

  const [showSheet, setshowSheet] = useState(false)
  const actions: Action[] = [
    {
      text: 'Light',
      key: 'light'
    },
    {
      text: 'Dark',
      key: 'dark'
    }
  ]

  const onAction = async (action: Action, index: number) => {
    await handleSettingTheme(action.key.toString())
    setshowSheet(false)
  }
  const handSetting = () => {
    setShow(true)
  }

  const handleClick = async (type: string) => {
    console.log('object :>> ', type)
    if (type === 'user') {
      dispatch({
        type: ActionAvatar.CLEAR_AVATAR
      })
      await sleep(100)
      dispatch(getUserInfo())
    }
    if (type === 'theme') {
      setshowSheet(true)
    }
    if (type === 'interface') {
      MSStrorage.instance.setItem('name', '永不过期')
      MSStrorage.instance.setItem('age', '5分钟后清除', {
        expires: 5,
        unit: 'm'
      })
      setShowPopup(true)
    }
    if (type === 'expire') {
      Toast.show({
        content: '示列'
      })
      // MSStrorage.instance.setItem('name', '永不过期')
      // MSStrorage.instance.setItem('age', '18', { expires: 5, unit: 'm' })
      // console.log(MSStrorage.instance.getItem('name'), 'name')
      // console.log(MSStrorage.instance.getItem('age'), 'age')
    }
  }

  const loginOut = () => {
    localStorage.removeItem('_token')
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  return (
    <>
      <div className="relative h-full w-full flex flex-col">
        <div
          className="h-1/3 flex flex-col items-center justify-center opacity-10"
          style={{ backgroundColor: userInfo.color }}></div>
        <div className="absolute top-0 left-0 w-full h-1/3 flex flex-col items-center justify-center">
          <Avatar
            src={avatarUrl}
            className="rounded-full h-16 w-16"
            onClick={() => {
              setVisible(true)
            }}></Avatar>
          <Ellipsis
            direction="end"
            rows={2}
            content={userInfo.sentence}
            className="px-3 mt-3 text-xs font-medium text-shadow-sm"
            style={{ color: userInfo.color }}
          />
          <ImageViewer
            image={userInfo.avatarUrl}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
          />
        </div>
        <ImageViewer.Multi
          images={demoImages}
          visible={show}
          defaultIndex={1}
          onClose={() => {
            setShow(false)
          }}
        />
        <div className="absolute top-2 right-2 p-1" onClick={handSetting}>
          <SetOutline fontSize={22} color={userInfo.color} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <List mode="card">
            <List.Item
              prefix={<UserSetOutline />}
              onClick={(e) => handleClick('user')}>
              更换头像
            </List.Item>
            <List.Item
              prefix={<AppstoreOutline />}
              onClick={(e) => handleClick('theme')}>
              更换主题
            </List.Item>
            <List.Item
              prefix={<ContentOutline />}
              onClick={(e) => handleClick('interface')}>
              更新接口源
            </List.Item>
            <List.Item
              prefix={<LockOutline />}
              onClick={(e) => handleClick('expire')}>
              localStorage过期设置
            </List.Item>
          </List>
        </div>
        <div className="flex items-center justify-center pb-10">
          <Button type="submit" color="danger" onClick={loginOut}>
            退出登录
          </Button>
        </div>
      </div>
      <ActionSheet
        cancelText="取消"
        visible={showSheet}
        actions={actions}
        onAction={onAction}
        onClose={() => setshowSheet(false)}
      />
      <Popup
        visible={showPopup}
        onMaskClick={() => {
          setShowPopup(false)
        }}
        bodyStyle={{ height: '30vh' }}>
        <CheckList
          defaultValue={['B']}
          onChange={(value: string[]) => setShowPopup(false)}>
          <CheckList.Item value="A">TenAPI</CheckList.Item>
          <CheckList.Item value="B">HAN</CheckList.Item>
        </CheckList>
      </Popup>
    </>
  )
}
export default User
