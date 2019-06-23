import styles from './index.less'
import Logo from './logo'
import Footer from './footer'
import {PureComponent} from 'react'
import Loader from './loader'
import Main from './main'
import Bg from './bg'

class BasicLayout extends PureComponent{
  render(){
    return (
      <div id="wrapper">
        <Logo/>
        <Footer/>
        <Loader/>
        <Bg/>
        <div id="main" style={{visibility: 'visible'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BasicLayout;
