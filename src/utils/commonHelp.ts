//自定义时间类型
export type timeType = 'Y' | 'M' | 'D' | 'h' | 'm' | 's'

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const isMobile = /Mobile/i.test(window.navigator.userAgent)


/**
 * 根据单位和传入时间，计算出毫秒时间
 * @param unit  单位
 * @param time 时间
 * @returns
 */
export const calcMilliseconds = (unit?: timeType, time: number = 0): number => {
  let getTime = 0
  switch (unit) {
    //'Y' | 'M' | 'D' | 'h' | 'm' | 's'
    case 'Y':
      getTime = time * 365 * 24 * 60 * 60 * 1000
      break;
    case 'M':
      //这里按每月30天计算
      getTime = time * 30 * 24 * 60 * 60 * 1000
      break;
    case 'D':
      getTime = time * 24 * 60 * 60 * 1000
      break;
    case 'h':
      getTime = time * 60 * 60 * 1000
      break;
    case 'm':
      getTime = time * 60 * 1000
      break;
    case 's':
      getTime = time * 1000
      break;
    default:
      getTime = time
      break;
  }
  return getTime
}