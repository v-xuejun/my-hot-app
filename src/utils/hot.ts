
export enum HotNewsEnum {
  ITInfo = 'itInfo',
  TouTiao = 'toutiao',
  WEIBO = 'weibo',
  BAIDU = 'baidu',
  ZHIHU = 'zhihu',
  DOUYIN = 'douyin',
  BILIBILI = 'bilibili'
}

export const hotTabs = [
  // {
  //   key: HotNewsEnum.TouTiao,
  //   title: '今日头条',
  // },
  {
    key: HotNewsEnum.ITInfo,
    title: 'IT资讯',
  },
  {
    key: HotNewsEnum.WEIBO,
    title: '微博'
  },
  {
    key: HotNewsEnum.BAIDU,
    title: '百度',
  },
  {
    key: HotNewsEnum.ZHIHU,
    title: '知乎'
  },
  {
    key: HotNewsEnum.DOUYIN,
    title: '抖音'
  },
  {
    key: HotNewsEnum.BILIBILI,
    title: 'B站'
  },
]

export interface HotNewsInterface {
  name: string
  hot: string
  url: string
  index: number
  title: string
  desc: string
  pic: string
  mobilUrl: string
}