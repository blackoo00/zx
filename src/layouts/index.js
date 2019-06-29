import Logo from './logo'
import Footer from './footer'
import {PureComponent} from 'react'
import Loader from './loader'
import Bg from './bg'
import {connect} from 'dva'
import config from '@/config.js'

const {noAnPage} = config

export  default @connect(({global,router}) => ({
  loading:global.loading,
  pageChange:global.pageChange,
  pathname:router.location.pathname,
}))
class extends PureComponent{
  componentDidUpdate(prevProps){
    const {pathname,dispatch} = this.props
    if(this.props.pathname != prevProps.pathname){
      dispatch({
        type:'global/handleLoading',
        payload:true
      })
    }
    if(noAnPage.includes(pathname)){//没有bounding外框的离开动画
      dispatch({
          type:'global/handlePageAnimation',
          payload:true
      })
      setTimeout(() => {
          dispatch({
              type:'global/handlePageAnimation',
              payload:false
          })
      },500)
  }
  }
  render(){
    const {loading} = this.props
    return (
      <div id="wrapper">
        <Logo/>
        <Footer/>
        <Loader/>
        {loading ? null : <Bg/>}
        <div id="main" style={{visibility: 'visible'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

