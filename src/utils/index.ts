import { Dialog } from "antd-mobile"

export type themeMode = 'light' | 'dark'
/**
 * 切换主题
 * @param type
 */
export async function handleSettingTheme(type: string) {
  const result = await Dialog.confirm({ content: '确定要更换主题吗？' })
  if (result) {
    // const mode = document.documentElement.className
    document.documentElement.setAttribute('class', type)
  }
}