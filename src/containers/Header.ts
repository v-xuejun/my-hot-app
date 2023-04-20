import { connect } from 'react-redux'
import { getUserInfo } from '@/store/action'
// import Header from '@/components/HeaderUI'
import { AppDispatch, RootState } from '@/store/hook'
import Header from '@/components/Header'

const HeaderConnect = connect(
  // mapStateToProps,
  // mapDispatchToProps
  (state: RootState) => {
    return {
      userInfo: state.userInfo
    }
  },
  (dispatch: AppDispatch, state: any) => {
    return {
      getUserInfo: () => {
        dispatch(getUserInfo())
      },
      handleRefresh: () => {
        console.log('点击事件', state);
      }
    }
  }
)(Header)
export default HeaderConnect