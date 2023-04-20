import { Component, ReactNode, memo } from 'react'
import { Avatar, Ellipsis } from 'antd-mobile'
import { IRouteProps, WithRouter } from '@/hoc/WithRouter'

//propsType interface extends A,B,C
type propsType = {
  getUserInfo: () => void
  handleRefresh: () => void
  userInfo: IAvatar
} & IRouteProps

interface stateType {
  visiable: boolean
}

class Header extends Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props)
    this.state = {
      visiable: true
    }
  }
  componentDidMount() {
    this.props.getUserInfo()
    // console.log(this.props)
  }

  // //在react16.3之前，componentWillReceiveProps是在不进行额外render的前提下，响应props中的改变并更新state的唯一方式。
  // componentWillReceiveProps(nextProps: Readonly<propsType>, nextContext: any): void {
  //   if (this.props.location.pathname !== nextProps.location.pathname) {
  //     this.setState({
  //       visiable: nextProps.location.pathname !== '/user'
  //     })
  //   }
  // }

  //getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
  // 该方法返回一个对象用于更新 state，如果返回 null 则不更新任何内容。
  // getDerivedStateFromProps是一个静态方法
  static getDerivedStateFromProps(props: propsType, state: stateType) {
    if (props.location.pathname !== '/user') {
      return {
        visiable: true
      }
    } else {
      return {
        visiable: false
      }
    }
  }

  render(): ReactNode {
    return (
      <div className={`h-11 w-full items-center px-3 bg-gray-50 ${this.state.visiable ? 'flex' : 'hidden'}`}>
        <Avatar src={this.props.userInfo.avatarUrl || ''} className="rounded-full h-9 w-9"></Avatar>
        {/* <div className='pl-4 flex-1 truncate' style={{ color: this.state.color }}>{this.state.sentence}</div> */}
        <div className='pl-4 flex-1' title={this.props.userInfo.sentence}>
          <Ellipsis direction='end' rows={1} content={this.props.userInfo.sentence || ''} style={{ color: this.props.userInfo.color }} />
        </div>
      </div>
    )
  }
}
// export default memo(Header, (prevProps: propsType, nextProps: propsType) => (prevProps.userInfo.avatarUrl === nextProps.userInfo.avatarUrl))
export default WithRouter(Header)

