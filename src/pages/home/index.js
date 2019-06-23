import styles from './index.less'
import title from '../../assets/images/home.png'
import {PureComponent} from 'react'
import {connect} from 'dva'

export default
@connect(({global}) => ({animation:global.animation}))
class extends PureComponent {
  componentDidMount() {
    const {animation} = this.props
    // this.pageInit(animation)
    document.getElementsByClassName('home-title')[0].classList.add(styles.title)
    document.getElementsByClassName('home-content')[0].classList.add(styles.content)
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const {animation} = this.props
  //   this.pageInit(animation)
  // }
  // pageInit = (animation) => {
  //   if(!animation){
  //       document.getElementsByClassName('home-title')[0].classList.add(styles.title)
  //       document.getElementsByClassName('home-content')[0].classList.add(styles.content)
  //   }else{
  //       // document.getElementsByClassName('home-title')[0].classList.remove(styles.title)
  //       // document.getElementsByClassName('home-content')[0].classList.remove(styles.content)
  //   }
  // }
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
  