import {PureComponent} from 'react'
import styles from './bounding.less'
import {connect} from 'dva'
let id = 0

export default
@connect(({global}) => ({pageChange:global.pageChange}))
class extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            step:1,
            outStep:1,
            showBg:true,
            animation: null
        }
        this.animationIn = [
            {className:'bounding-box',time:500,aName:'boxshow',step:1},
            {className:'bounding-box-top-border',time:200,aName:'border-show',step:2},
            {className:'bounding-box-bottom-border',time:200,aName:'border-show',step:2},
            {className:'bounding-box',time:400,aName:'boxhide',step:3},
            {className:'bounding-box-top-border',time:1000,aName:'top-border-move',step:3},
            {className:'bounding-box-bottom-border',time:1000,aName:'bottom-border-move',step:3},
            {className:'bounding-box-bg-container',time:1500,aName:'boundingBG',step:4},
            {className:'sly-scrollbar',time:400,aName:'boundingBar',step:4},
            {className:'content',time:400,aName:'boundingContent',step:4},
            // {className:'title-container',time:500,aName:'boundingTitle',step:4},
            {className:'bounding-box-top-glow',time:500,aName:'boundingGlowTop',step:4},
            {className:'bounding-box-bottom-glow',time:500,aName:'boundingGlowBottom',step:4},
        ]
        this.animationOut = [
            {className:'content',time:250,aName:'boundingContentOut',step:1},
            {className:'sly-scrollbar',time:300,aName:'boundingBarOut',step:1},
            // {className:'title-container',time:300,aName:'boundingTitleOut',step:1},
            {className:'bounding-box-top-glow',time:300,aName:'boundingGlowTopOut',step:1},
            {className:'bounding-box-bottom-glow',time:300,aName:'boundingGlowBottomOut',step:1},
            {className:'bounding-box-bg-container',time:300,aName:'boundingBGOut',step:1},
            {className:'bounding-box-top-border',time:400,aName:'boundingTopMoveOut',step:1},
            {className:'bounding-box-bottom-border',time:400,aName:'boundingBottomMoveOut',step:1},
            {className:'bounding-box',time:500,aName:'boxshow2',step:2},
            {className:'bounding-box-top-border',time:400,aName:'borderHide',step:3},
            {className:'bounding-box-bottom-border',time:400,aName:'borderHide',step:3},
            {className:'bounding-box',time:400,aName:'boxhide2',step:3},
        ]
    }
    componentDidMount(){
        const {finish} = this.props
        this.pageIn()
        setTimeout(() => {
            finish && finish()
        },1800)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pageChange,back} = this.props
        const _this = this
        if(pageChange || back){
            clearTimeout(id)
            _this.pageOut()
        }
    }
    pageIn = () => {
        const _this = this
        _this.setState({
            step:1,
            outStep:1,
            animation:false,
            showBg:false
        },() => {
            _this.handleAnimationIn()
        })
    }
    pageOut = () => {
        const {dispatch,end} = this.props
        this.handleAnimationOut()
        end && end()
        setTimeout(() => {
            dispatch({
                type:'global/pageChange',
                payload:false
            })
        },800)
    }
    getScale = () => {
        var e, t, n, r, i, s, o, u, a, f;
        return e = !!navigator.userAgent.match(/iPhone/i), t = typeof window.orientation == "number" ? window.orientation : !1, n = t === 0 || t === 180 || t === -180 || t === 360 ? !0 : !1, r = document.documentElement.clientWidth, i = document.documentElement.clientHeight, s = r / 1024, o = i / 672, u = t && n ? s : Math.min(s, o), a = Math.round(u * 100) / 100, a
    }
    handleAnimationIn = () => {
        let step = this.state.step;
        const _this = this
        const animationIn = this.animationIn
        let maxStep = this.getMaxStep(animationIn)
        if(step >= maxStep){
            this.setState({
                animation:false
            })
            return
        }
        if(step === 3){
            this.setState({
                showBg:true
            })
        }
        const aData = this.animationIn.filter(item => item.step === step)
        for(let item of aData){
            document.getElementsByClassName(item.className)[0].classList.add(styles[item.aName])
        }
        id = setTimeout(() => {
            step ++
            _this.setState({
                step:step
            },_this.handleAnimationIn())
        },aData[0]['time'])
    }
    getMaxStep = (array) => {
        let maxStep = 0
        for(let item of array){
            if(item.step > maxStep){
                maxStep = item.step
            }
        }
        return maxStep + 1
    }
    handleAnimationOut = () => {
        const _this = this
        let step = this.state.outStep;
        const maxStep = this.getMaxStep(this.animationOut)
        if(step >= maxStep){
            this.setState({
                animation:false
            })
            return
        }
        const aData = this.animationOut.filter(item => item.step === step)
        for(let item of aData){
            document.getElementsByClassName(item.className)[0].classList.add(styles[item.aName])
        }
        id = setTimeout(() => {
            step ++
            _this.setState({
                outStep:step
            },_this.handleAnimationOut())
        },aData[0]['time'])
    }
    componentWillUnmount(){
        clearTimeout(id)
    }
    animationPage = (children) => {
        const scale = this.getScale()
        return(
            <>
                <div className={`transitioning bounding-box`}>
                    <div className="transitioning-bg"></div>
                </div>
                <div className={`static bounding-box`} style={{transform:'scale('+scale+')'}}>
                    <div className="bounding-box-top-glow"></div>
                    <div className="bounding-box-bottom-glow"></div>
                    <div className="bounding-box-bg-container">
                        <div className={`bounding-box-bg ${styles.mask}`}></div>
                    </div>
                    <div className={`bounding-box-top-border`}></div>
                    <div className={`bounding-box-bottom-border`}></div>
                    {children}
                    <div className="sly-scrollbar">
                        <div className="handle">
                            <div className="handle-bg"></div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
    render(){
        const {children} = this.props
        const con = this.animationPage(children)
        return(
            <>
                {con}
            </>
        )
    }
}