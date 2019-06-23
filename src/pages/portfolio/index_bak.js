import { PureComponent } from 'react'
import pic from '@/assets/images/test.jpeg'
import Bound from '@/components/bounding/'
import styles from './index.less'
import portfolio from '@/assets/images/portfolio.png'
import ReactSwipe from 'react-swipe';

export default class extends PureComponent {
    componentDidMount() {

    }
    showTemp = () => {
        document.getElementsByClassName('page-title-section')[0].classList.add(styles.show1)
        document.getElementsByClassName('page-copy-icon')[0].classList.add(styles.show2)
    }
    render() {
    let reactSwipeEl;
        return (
            <div id="portfolio" className="thumb-gallery page">
                <Bound finish={this.showTemp}>
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-title-wrapper">
                            <div className="title-line"></div>
                            <img src={portfolio} className="title-image" alt="Portfolio" title="Portfolio"/>
                            <div className="title-line"></div>
                            
                        </span>
                    </h1>
                </div>
                <a className="page-copy-icon" id="page-copy-open">
                    Learn More About Portfolio
                </a>
                <a className="page-copy-icon" id="page-copy-exit">View Gallery</a>
                <div className={`content-wrapper`}>
			        <div id="content-bg"></div>
                    <div className="content sly-frame" style={{overflow: 'hidden'}}>
                        <ul className="sly-content">
                        {/* <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: false }}
                            ref={el => (reactSwipeEl = el)}
                        > */}
                            <li className="project-thumb ready" style={{opacity:0.9,transform:'translate(0px, -330px)'}}>
                                <a className={`project-a imgLiquid_bgSize imgLiquid_ready ${styles.img}`} style={{backgroundImage:'url('+pic+')'}} href="/portfolio/bmw-bavaria-lounge/1" >
                                    <img src={pic} className="project-thumb-img" alt="BMW Bavaria Lounge" title="BMW Bavaria Lounge"/>
                                    <div className="caption">
                                        <h2 className="caption-title">BMW Bavaria Lounge</h2>
                                        <h3 className="caption-subtitle">By Ferris Rafauli</h3>
                                    </div>
                                    <div className="shade"></div>
                                </a>
                            </li>
                            {/* </ReactSwipe> */}
                        </ul>
                    </div>
                </div>
                </Bound>
            </div>
        );
    }
}