import { PureComponent } from 'react'
import pic from '@/assets/images/test.jpeg'
import Bound from '@/components/bounding/'
import styles from './index.less'
import portfolio from '@/assets/images/portfolio.png'
import {connect} from 'dva'
import Link from 'umi/link'

const liWidth = 289

export default
@connect(({global}) => ({
    loading:global.loading
}))
class extends PureComponent {
    id = 0
    x = 0
    constructor(props){
        super(props)
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
        const {dispatch} = this.props
        setTimeout(() => {
            dispatch({
                type:'global/handleLoading',
                payload:false
            })
            this.init()
        },1000)
    }
    init = () => {
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
        const _this = this
        _this.id = setInterval(() => {
            _this.translate3d(_this.x - 1)
        },50)
    }
    componentWillUnmount(){
        clearInterval(this.id)
    }
    translate3d = (x) => {
        if(this.x >= 0 && x > 0) {this.x = 0;return}
        const frame = document.getElementById('pframe')
        const fwidth = Math.ceil(frame.clientWidth)
        if(this.x <= (-fwidth-liWidth) && x < (-fwidth - liWidth)) return
        const div = document.getElementById('plist')
        this.x = x
        div.style['transform'] = 'translate3d('+ x +'px,0,0)'
        div.style['transition'] = 'all 400ms'
    }
    prev = () => () => {
        const len = liWidth * 3
        const x = (this.x + len) >= 0 ? 0 : this.x + len
        this.translate3d(x)
    }
    next = () => () => {
        const frame = document.getElementById('pframe')
        const fwidth = Math.ceil(frame.clientWidth)
        const len = liWidth * 3
        const x = (this.x - len) < (-fwidth-liWidth) ? (-fwidth-liWidth) : this.x - len
        this.translate3d(x)
    }
    finish = () => {
        document.getElementsByClassName('page-title-section')[0].classList.add(styles.show1)
        document.getElementsByClassName('page-copy-icon')[0].classList.add(styles.show2)
        document.getElementsByClassName('bounding-box-top-shadow')[0].style = 'visibility: visible; opacity: 1'
        document.getElementsByClassName('bounding-box-bottom-shadow')[0].style = 'visibility: visible; opacity: 1'
    }
    render() {
        const {list} = this.state
        const {loading} = this.props
        if(loading) return null 
        return (
            <div id="portfolio" className="thumb-gallery page">
                <Bound finish={this.finish}>
                <div class="bounding-box-top-shadow"></div>
                <div class="bounding-box-bottom-shadow"></div>
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
                                    <Link onDragStart={() => {return false}} className={`project-a imgLiquid_bgSize imgLiquid_ready ${styles.img}`} style={{backgroundImage:'url('+item.src+')'}} to={`/portfolio/sherclub/?id=${item.id}`}>
                                    <img onDragStart={() => {return false}} src={item.src} className="project-thumb-img" alt="Fine Furniture" title="Fine Furniture"/>
                                        <div className="caption">
                                            <h2 className="caption-title">{item.title}</h2>
                                            <h3 className="caption-subtitle">{item.subtitle}</h3>
                                        </div>
                                        <div className="shade"></div>
                                    </Link>
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