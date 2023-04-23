import { timeType, calcMilliseconds } from './commonHelp'

// 定义可选参类型
interface IExtraOptions {
  expires?: number
  unit?: timeType
  reset?: boolean
  // startTime?: number
  // value?: any
  //[name: string]: any;
}

const Extra_Options: IExtraOptions = {
  expires: 0, // 默认永久
  unit: 's', // 默认秒
  reset: false //是否重置过期时间
  // value: '',
  // startTime: 0
}

export default class MSStrorage {
  storage: Storage
  private static _instance: MSStrorage
  // 计算时间
  millisecond: number = 0
  constructor() {
    this.storage = window.localStorage
  }
  get _millisecond(): number {
    return this.millisecond
  }

  set _millisecond(num: number) {
    this.millisecond = num
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new MSStrorage()
    }
    return this._instance
  }

  //设置storage
  private _set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string, isMerge: boolean = false) {
    try {
      if (!key) return null
      const localItem = this.storage.getItem(key!)
      if (localItem) {
        const localStore: any = JSON.parse(localItem)
        const time = Date.now()
        const _expires = localStore.expires || 0
        //如果是永久，则直接返回值
        if (_expires === 0) return isMerge ? localStore : localStore.value
        // 判断是否过期,过期则删除
        if (localStore.startTime && time - localStore.startTime >= _expires) {
          this.removeItem(key)
          return null
        }
        return isMerge ? localStore : localStore.value
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  setItem(key: string, value: any, options?: IExtraOptions): void {
    const hasStore: any = this.getItem(key, true)
    const extra = { ...Extra_Options, ...options } //合并对象，防止初始值不存在

    if (hasStore) {
      // 存在，是否要重新设置值
      hasStore.value = value
      //设置过期时间，如5分钟，{ expires: 5, unit: 'm' }
      hasStore.expires = calcMilliseconds(
        extra.unit || hasStore.unit,
        extra.expires || hasStore.expires
      )
      hasStore.unit = extra.unit
      if (extra.reset) {
        // 存在且重新设置时间
        hasStore.startTime = Date.now()
      }
      this._set(key, hasStore)
    } else {
      const newStore = {
        value,
        startTime: Date.now(),
        unit: extra.unit,
        expires: calcMilliseconds(extra.unit, extra.expires)
      }
      this._set(key, newStore)
    }
  }
  removeItem(key: string): void {
    key && this.storage.removeItem(key)
  }
  clear(): void {
    this.storage.clear()
  }
}
