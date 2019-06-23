import { PureComponent } from 'react'
import bg from '../assets/images/home.jpg'
import careersBg from '@/assets/images/careers.jpg'
import portfolioBg from '@/assets/images/portfolio_new.jpg'
import artBg from '@/assets/images/execute_and_build.jpg'
import designBg from '@/assets/images/design_and_architect.jpg'
import bgVideo from '../assets/videos/home1.mp4'
import {connect} from 'dva'

const hasVideo = ['/','/philosophy','/ferris-rafauli']
const bgs = {
    '/careers':careersBg,
    '/portfolio':portfolioBg,
    '/philosophy/the-art-is-the-design':artBg,
    '/philosophy/the-science-is-the-build':designBg
}

export default
@connect(({router}) => ({pathname:router.location.pathname}))
class extends PureComponent {
    constructor(props) {
        super(props)
        const data = this.adaptBg()
        const vData = this.adaptVideo()
        const {pathname} = this.props
        
        this.state = {
            ...data,
            ...vData,
            videoOver: false,
            bg:hasVideo.includes(pathname) ? bg : bgs[pathname],
            videoshow:hasVideo.includes(pathname) ? true : false,
            pathname:pathname
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.pathname != this.props.pathname){
            let bg = bg
            let videoshow = false
            const pathname = this.props.pathname
            if(hasVideo.includes(pathname)){
                videoshow = true
            }else{
                bg = bgs[pathname]
            }
            this.setState({
                ...prevState,
                pathname:pathname,
                bg:bg,
                videoshow:videoshow
            })
        }
    }
    componentDidMount() {
        const _this = this
        window.onresize = function () {
            const data = _this.adaptBg()
            _this.setState(data)
        }
        const videoshow = this.state.videoshow
        if(!videoshow) return
        var md = document.getElementsByTagName("video")[0];
        md.addEventListener("ended", function () {
            _this.setState({
                videoOver: true
            })
        })
    }
    adaptBg = () => {
        let r = new Image;
        r.src = bg;
        const e = document.documentElement.clientWidth;
        const t = document.documentElement.clientHeight;
        let data = {}
        let i, s, o, u, a, f, l, c;
        i = r.width;
        s = r.height;
        o = i / s;
        u = e / t;
        a = Math.ceil(e / o);
        f = Math.ceil(t * o);
        l = (t - a) / 2;
        c = (e - f) / 2;
        u > o * 1.5 || u < o ? data = {
            height: t,
            marginLeft: c,
            marginTop: "0",
            width: f
        } : data = {
            width: e,
            height: a,
            marginLeft: 0,
            marginTop: l
        }
        return data
    }
    adaptVideo = () => {
        const e = document.documentElement.clientWidth;
        const t = document.documentElement.clientHeight;
        let data = {}
        var n = 1280 / 720,
            r = e / t,
            i = Math.ceil(e / n),
            s = Math.ceil(t * n),
            o = (i - t) / 2,
            u = (s - e) / 2;
        r > n ? data = {
            vWidth: e,
            vHeight: i,
            vMarginTop: -o
        } : data = {
            vWidth: s,
            vHeight: t,
            vMarginLeft: -u
        }
        return data
    }
    render() {
        const { videoshow,bg, videoOver, width, height, marginLeft, marginTop, vWidth, vHeight, vMarginLeft, vMarginTop } = this.state
        const { show = true } = this.props
        if(!show) return null
        return (
            <>
                <div id="page-bg" style={{ opacity: 1, left: '0px' }}>
                    <img src={bg} className="page-bg" alt="Home" title="Home"
                        style={{ height: height, marginLeft: marginLeft, marginTop: marginTop, width: width, opacity: 1 }} />
                    {videoshow ? <video id="home-video" style={{ height: vHeight, marginLeft: vMarginLeft, marginTop: vMarginTop, width: vWidth, opacity: videoOver ? 0 : 1 }} autoPlay muted>
                        <source src={bgVideo} type="video/mp4" />
                        您的浏览器不支持Video标签。
                    </video> : null}
                </div>
                <div id="scanlines"></div>
            </>
        )
    }
}