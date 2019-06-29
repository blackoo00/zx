import styles from './index.less'
import title from '../../assets/images/home.png'
import {PureComponent} from 'react'
import {connect} from 'dva'

export default
@connect(({global,router}) => ({
  pageChange:global.pageChange,
  loading:global.loading,
  pathname:router.location.pathname
}))
class extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props
    setTimeout(() => {
      dispatch({
        type:'global/handleLoading',
        payload:false
      })
      this.pageIn()
    },1000)
  }
  componentDidUpdate(prevProps){
    if(this.props.pageChange){
      this.pageOut()
    }
  }
  pageIn = () => {
    setTimeout(() => {
      document.getElementsByClassName('home-title')[0].style = 'opacity: 1;transform: translateY(-20%);transition:all 1s'
      document.getElementsByClassName('home-content')[0].style = 'opacity: 1;transition:all 3s'
    })
  }
  pageOut = () => {
    setTimeout(() => {
      document.getElementsByClassName('home-title')[0].style = 'opacity: 0;transform: translateY(50%);transition:all 1s'
      document.getElementsByClassName('home-content')[0].style = 'opacity: 0;transform: translateY(50%);transition:all 1s'
    })
  }
  render(){
    return (
      <>
        <div id="home" className="home page">
          <div className={`bounding-box`}>
            <div id="home-content" className="content">
              <h1 className={`home-title`}><img alt='' src={title}/></h1>
              <div className={`home-content`}>
                <p>Ferris Rafauli is an iconic designer and artist who conceives, designs and builds
                  ultra-luxury homes and lifestyle creations for an elite clientele worldwide.</p>
                <p>View our <a href="portfolio/" target="_self">Portfolio</a> or Explore more below.</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
  