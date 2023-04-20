import { useRouteError } from 'react-router-dom'
import { Space, ErrorBlock } from 'antd-mobile'
const Error = () => {
  const errInfo: any = useRouteError()
  console.log(errInfo)

  return (
    <>
      <Space block direction='vertical' align="center" justify='center' className='h-full' >
        <ErrorBlock status='empty'></ErrorBlock>
        <div className='mt-2'>{errInfo.statusText || errInfo.message}</div>
      </Space>
    </>
  )
}
export default Error