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
  CheckList,
  Mask,
  Input,
  Selector
} from 'antd-mobile'

import {
  SetOutline,
  UserSetOutline,
  AppstoreOutline,
  ContentOutline,
  CheckShieldOutline,
  LockOutline
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState, startTransition } from 'react'
import type { Action } from 'antd-mobile/es/components/action-sheet'
import { getUserInfo } from '@/store/action'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { ActionAvatar } from '@/store/actionTypes'
import { sleep, timeType } from '@/utils/commonHelp'
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

  const navigate = useNavigate() // 声明式导航

  const avatarUrl = useMemo(() => userInfo.avatarUrl, [userInfo])
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  const [showPopup, setShowPopup] = useState(false)
  const [showSheet, setshowSheet] = useState(false)
  const [showMask, setshowMask] = useState(false)
  const [unit, setUnit] = useState<timeType>('D')
  const [value, setValue] = useState('1')
  const unitOptions: { label: string; value: timeType }[] = [
    {
      label: '年',
      value: 'Y'
    },
    {
      label: '月',
      value: 'M'
    },
    {
      label: '日',
      value: 'D'
    },
    {
      label: '时',
      value: 'h'
    },
    {
      label: '分',
      value: 'm'
    },
    {
      label: '秒',
      value: 's'
    }
  ]
  const demoImages = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3128&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80'
  ]

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
      setShowPopup(true)
    }
    if (type === 'expire') {
      // Toast.show({
      //   content: '示列'
      // })
      const has = MSStrorage.instance.getItem('_token')
      has ? setshowMask(true) : navigate('/login')
    }
    if (type === 'about') {
      startTransition(() => {
        navigate('/details')
      })
      // navigate('/details')
    }
  }

  const loginOut = () => {
    MSStrorage.instance.removeItem('_token')
    MSStrorage.instance.removeItem('userInfo')
    navigate('/login')
  }
  const handleSetExpier = () => {
    MSStrorage.instance.setItem('_token', '_token', {
      expires: parseInt(value),
      unit: unit
    })
    setshowMask(false)
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
            <List.Item
              prefix={<CheckShieldOutline />}
              onClick={(e) => handleClick('about')}>
              关于
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
      <Mask visible={showMask}>
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="w-5/6 h-1/2 p-5 rounded bg-white">
            <div className="flex items-center">
              <span className="mr-5 w-10">时间</span>
              <Input
                type="number"
                max={100}
                value={value}
                onChange={(val) => {
                  setValue(val)
                }}
                placeholder="请输入数字"
                className="h-8 pl-2 rounded border border-gray-100"></Input>
            </div>
            <div className="mt-5">
              <Selector
                columns={2}
                value={[unit]}
                options={unitOptions}
                onChange={(v) => {
                  if (v.length) {
                    setUnit(v[0])
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-center mt-5">
              <Button className="mr-5" onClick={() => setshowMask(false)}>
                取消
              </Button>
              <Button color="primary" onClick={() => handleSetExpier()}>
                确定
              </Button>
            </div>
          </div>
        </div>
      </Mask>
    </>
  )
}
export default User
