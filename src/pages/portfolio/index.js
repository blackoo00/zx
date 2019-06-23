import { PureComponent } from 'react'
import pic from '@/assets/images/test.jpeg'
import Bound from '@/components/bounding/'
import styles from './index.less'
import portfolio from '@/assets/images/portfolio.png'
import {connect} from 'dva'

const liWidth = 289

export default
@connect(({global}) => ({
    scale:global.scale
}))
class extends PureComponent {
    id = 0
    x = 0
    constructor(props){
        super(props)
        const scale = props.scale
        let list = []
        let len = liWidth
        for(let i = 1; i < 10; i++){
            list.push({
                id:i,
                src:pic,
                title:'test'+i,
                subtitle:'test'+i
            })
            len += liWidth
        }
        this.state = {
            list:list,
            width:len,
            num:list.length
        }
    }
    componentDidMount() {
        // this.move()
        const div = document.getElementById('plist')
        const prev = document.getElementById('prev')
        const next = document.getElementById('next')
        const _this = this
        let draging = false
        let lastDragX = 0
        this.swiper()
        const width = this.state.width
        div.style['width'] = width + 'px'
        div.addEventListener("mousedown",function(e){
            console.log('down')
            draging = true
            e.preventDefault()
        },false);
        div.addEventListener("mouseup",function(){
            console.log('up')
            lastDragX = 0
            draging = false
        },false);
        div.addEventListener("mousemove",function(e){
            if(draging){
                if(lastDragX != 0){
                    console.log('draf',e.pageX - lastDragX)
                    _this.translate3d(e.pageX - lastDragX + _this.x)
                }
                lastDragX = e.pageX
            }
            e.preventDefault()
        },false);
        div.addEventListener("mouseenter",function(){
            console.log('enter')
            clearInterval(_this.id)
        },false);
        prev.addEventListener("mouseenter",function(){
            console.log('enter')
            clearInterval(_this.id)
        },false);
        next.addEventListener("mouseenter",function(){
            console.log('enter')
            clearInterval(_this.id)
        },false);
        div.addEventListener("mouseleave",function(){
            console.log('leave')
            _this.swiper()
        },false);
    }
    swiper = () => {
        // const _this = this
        // _this.id = setInterval(() => {
        //     _this.translate3d(_this.x - 1)
        // },50)
    }
    translate3d = (x) => {
        if(this.x >= 0 && x > 0) {this.x = 0;return}
        const frame = document.getElementById('pframe')
        const fwidth = Math.ceil(frame.clientWidth)
        if(this.x <= (-fwidth-liWidth) && x < (-fwidth - liWidth)) return
        const div = document.getElementById('plist')
        this.x = x
        div.style['transform'] = 'translate3d('+ x +'px,0,0)'
    }
    prev = () => () => {
        const len = liWidth * 3
        this.translate3d(this.x + len)
    }
    next = () => () => {
        const len = liWidth * 3
        this.translate3d(this.x - len)
    }
    showTemp = () => {
        document.getElementsByClassName('page-title-section')[0].classList.add(styles.show1)
        document.getElementsByClassName('page-copy-icon')[0].classList.add(styles.show2)
    }
    render() {
        const {list} = this.state
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
                <div className={`content-wrapper ${styles.mask}`}>
			        <div id="content-bg"></div>
                    <div className="content sly-frame" style={{overflow: 'hidden',visibility:'hidden'}} id="pframe">
                        <ul className="sly-content" id="plist">
                            {list.map(item => (
                                <li key={item.id} className="project-thumb ready" style={{opacity:0.9,transform:'translate(0px, -330px)'}}>
                                    <a onDragStart={() => {return false}} className={`project-a imgLiquid_bgSize imgLiquid_ready ${styles.img}`} style={{backgroundImage:'url('+item.src+')'}} href="#" >
                                    <img onDragStart={() => {return false}} src={item.src} className="project-thumb-img" alt="Fine Furniture" title="Fine Furniture"/>
                                        <div className="caption">
                                            <h2 className="caption-title">{item.title}</h2>
                                            <h3 className="caption-subtitle">{item.subtitle}</h3>
                                        </div>
                                        <div className="shade"></div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                </Bound>
                <a onClick={this.prev()} id="prev" className="sly-button prev" style={{transform: 'translate(45px, 0px)'}}></a>
                <a onClick={this.next()} id="next" className="sly-button next" style={{transform: 'translate(-45px, 0px)'}}></a>
                {/* <div id="thumb-gallery-hint" class="hint">Click to View Photos</div> */}
            </div>
        );
    }
}