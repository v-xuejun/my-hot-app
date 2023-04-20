import { requestAxios } from './request'
import { HotNewsEnum, HotNewsInterface } from '@/utils/hot'
//头像
export function getAvatar() {
  return requestAxios('/tenapi/v2/acg?format=json', 'post')
}

// 每日一句
export function getDaySentence() {
  return requestAxios('/tenapi/v2/yiyan?format=json', 'post')
}

// 随机颜色
export function randomColor() {
  return requestAxios('/tenapi/v2/color', 'get')
}

//随机笑话、每日一笑
export function getDaySmile() {
  return requestAxios('/vvhan/api/joke?type=json', 'post')
}

// 每日一句情商
export function getEmotional() {
  return requestAxios('/vvhan/api/love?type=json', 'post')
}

// sao
export function getExciting() {
  return requestAxios('/vvhan/api/sao?type=json', 'post')
}

//微博热搜
export function getWeiBoHot() {
  // return requestAxios('/tenapi/v2/weibohot', 'get')
  return requestAxios('/vvhan/api/hotlist?type=wbHot', 'get')
}
//百度热搜
export function getBaiDuHot() {
  // return requestAxios('/tenapi/v2/baiduhot', 'get')
  return requestAxios('/vvhan/api/hotlist?type=baiduRD', 'get')
}
//抖音热搜
export function getDouYinHot() {
  // return requestAxios('/tenapi/v2/douyinhot', 'get')
  return requestAxios('/vvhan/api/hotlist?type=douyinHot', 'get')
}
//知乎热搜
export function getZhiHuHot() {
  // return requestAxios('/tenapi/v2/zhihuhot', 'get')
  return requestAxios('/vvhan/api/hotlist?type=zhihuHot', 'get')
}
//今日头条热搜
export function getTouTiaoHot() {
  return requestAxios('/tenapi/v2/toutiaohot', 'get')
}
//哔哩哔哩热搜
export function getBiLiHot() {
  // return requestAxios('/tenapi/v2/bilihot', 'get')
  return requestAxios('/vvhan/api/hotlist?type=bili', 'get')
}
//IT资讯热搜
export function getItInfoHot() {
  return requestAxios('/vvhan/api/hotlist?type=itInfo', 'get')
}

//获取热搜列表数据
export async function GetHotList(type: HotNewsEnum) {
  let result: any
  switch (type) {
    case HotNewsEnum.TouTiao:
      result = await getTouTiaoHot()
      break
    case HotNewsEnum.BAIDU:
      result = await getBaiDuHot()
      break
    case HotNewsEnum.WEIBO:
      result = await getWeiBoHot()
      break
    case HotNewsEnum.DOUYIN:
      result = await getDouYinHot()
      break
    case HotNewsEnum.ZHIHU:
      result = await getZhiHuHot()
      break
    case HotNewsEnum.BILIBILI:
      result = await getBiLiHot()
      break
    case HotNewsEnum.ITInfo:
      result = await getItInfoHot()
      break
    default:
      result = await getItInfoHot()
  }
  if (+result.code === 200 || result.success) {
    return result.data
  } else {
    return []
  }
}