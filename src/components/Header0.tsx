import { Component, ReactNode } from 'react'
import { Avatar, Ellipsis } from 'antd-mobile'
import { getAvatar, getDaySentence, randomColor } from '@/api/index'

type stateType = {
  avatarUrl: string
  sentence: string
  color: string
}

interface Header {
  state: stateType
}

class Header extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      avatarUrl: '',
      sentence: '',
      color: ''
    }
  }

  async componentDidMount(): Promise<void> {
    const result: any = await getAvatar()
    const res: any = await getDaySentence()
    const resColor: any = await randomColor()
    this.setState({
      avatarUrl: result.data.url,
      sentence: res.data.hitokoto,
      color: resColor.data.color
    })
  }
  // shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
  //   console.log(nextProps, nextState, nextContext);
  //   return true
  // }
  render(): ReactNode {
    return (
      <div className='h-11 w-full flex items-center px-3 bg-gray-50'>
        <Avatar src={this.state.avatarUrl} className="rounded-full h-9 w-9"></Avatar>
        {/* <div className='pl-4 flex-1 truncate' style={{ color: this.state.color }}>{this.state.sentence}</div> */}
        <div className='pl-4 flex-1' title={this.state.sentence}>
          <Ellipsis direction='end' rows={1} content={this.state.sentence} style={{ color: this.state.color }} />
        </div>
      </div>
    )
  }
}
export default Header

