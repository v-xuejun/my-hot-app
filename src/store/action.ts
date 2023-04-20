import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, ActionAvatar } from './actionTypes'
import { getAvatar, getDaySentence, randomColor } from '@/api/index'
import { MyThunkAction, RootState } from './hook'
import { calcMilliseconds } from '@/utils/commonHelp'

let nextTodoId = 0
export function addTodo(text: string): IAction {
  return { type: ADD_TODO, id: nextTodoId++, text }
}

export function toggleTodo(id: number): IAction {
  return { type: TOGGLE_TODO, id }
}

export function setVisibilityFilter(filter: any): IAction {
  return { type: SET_VISIBILITY_FILTER, filter }
}

// 响应接受用户信息
export function receiveUserInfo(userInfo: IAvatar = {}): IAction {
  return { type: ActionAvatar.LOAD_USERINFO, userInfo, receivedAt: Date.now(), loginState: true }
}

export function getUserInfo(): MyThunkAction {
  return async (dispatch, getState) => {
    const currt = getState().userInfo
    const time = Date.now() - currt.receivedAt
    //间隔1小时刷新一次
    if (time >= calcMilliseconds('h', 1) || !currt.avatarUrl) {
      // 首次 dispatch：更新应用的 state 来通知
      // API 请求发起了。
      // 可以多次 dispatch！
      // 这里，使用 API 请求结果来更新应用的 state。
      const [resHead, resWord, resColor] = await Promise.all([getAvatar(), getDaySentence(), randomColor()])
      dispatch(receiveUserInfo({
        avatarUrl: resHead.data.url,
        sentence: resWord.data.hitokoto,
        color: resColor.data.color
      }))
      // Promise.all([getAvatar(), getDaySentence(), randomColor()]).then(([resHead, resWord, resColor])=> { })
    }
  }
}

