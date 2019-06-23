import {PureComponent} from 'react'
import styles from './less/bounding.less'
import {connect} from 'dva'
import Bg from './bg'
let id = 0

const noAnimationPage = ["/","/portfolio"]

export default
@connect(({router}) => ({pathname:router.location.pathname}))
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
            // {className:'content',time:400,aName:'boundingContent',step:4},
            // {className:'title-container',time:500,aName:'boundingTitle',step:4},
            {className:'bounding-box-top-glow',time:500,aName:'boundingGlowTop',step:5},
            {className:'bounding-box-bottom-glow',time:500,aName:'boundingGlowBottom',step:5},
        ]
        this.animationOut = [
            // {className:'content',time:250,aName:'boundingContentOut',step:1},
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
        const {pathname} = this.props
        const _this = this
        this.pageIn()
        // if(pathname != '/'){
        //     this.pageIn()
        //     // setTimeout(() => {
        //     //     _this.handleAnimationOut()
        //     // },5000)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const pathname = this.props.pathname
        const prevPathname = prevProps.pathname
        const _this = this
        const {dispatch} = this.props
        if(prevPathname !== pathname){
            clearTimeout(id)
            if(!noAnimationPage.includes(prevPathname)){
                this.setState({
                    animation:true
                },() => {
                    // dispatch({
                    //     type:'global/assignAn',
                    //     payload:true
                    // })
                    // _this.handleAnimationOut().then(() => {
                    //     this.pageIn()
                    // })
                })
            }else{
                this.pageIn()
            }
        }
    }
    pageIn = () => {
        const {dispatch} = this.props
        dispatch({
            type:'global/assignAn',
            payload:true
        })
        const pathname = this.props.pathname
        const _this = this
        return new Promise((resolve) => {
            if(!noAnimationPage.includes(pathname)){
                _this.setState({
                    step:1,
                    outStep:1,
                    animation:false,
                    showBg:false
                },() => {
                    _this.handleAnimationIn()
                })
            }else{
                dispatch({
                    type:'global/assignAn',
                    payload:false
                })
                _this.setState({
                    showBg:true
                })
            }
        })
    }
    getScale = () => {
        var e, t, n, r, i, s, o, u, a, f;
        return e = !!navigator.userAgent.match(/iPhone/i), t = typeof window.orientation == "number" ? window.orientation : !1, n = t === 0 || t === 180 || t === -180 || t === 360 ? !0 : !1, r = document.documentElement.clientWidth, i = document.documentElement.clientHeight, s = r / 1024, o = i / 672, u = t && n ? s : Math.min(s, o), a = Math.round(u * 100) / 100, a
    }
    handleAnimationIn = () => {
        let step = this.state.step;
        const _this = this
        if(step >= 6){
            this.setState({
                animation:false
            })
            return
        }
        if(step === 4){
            const {dispatch} = this.props
            dispatch({
                type:'global/assignAn',
                payload:false
            })
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
    handleAnimationOut = () => {
        const _this = this
        return new Promise((resolve,reject) => {
            let step = this.state.outStep;
            if(step >= 4){
                this.setState({
                    animation:false
                })
                resolve()
            }
            const aData = this.animationOut.filter(item => item.step === step)
            for(let item of aData){
                document.getElementsByClassName(item.className)[0].classList.add(styles[item.aName])
            }
            id = setTimeout(() => {
                step ++
                _this.setState({
                    outStep:step
                },() => {resolve();_this.handleAnimationOut()})
            },aData[0]['time'])
        })
    }
    componentWillUnmount(){
        clearTimeout(id)
    }
    animationPage = (children) => {
        const scale = this.getScale()
        return(
            <>
                <div id={'careers'} className={`${'careers'} page`}>
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
                        {/* <div className="title-container">
                            <h1 className="page-title">Careers</h1>
                        </div>
                        <div className="content sly-frame">
                            {children}
                        </div> */}
                        <div className="sly-scrollbar">
                            <div className="handle">
                                <div className="handle-bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
    render(){
        const {children,pathname} = this.props
        const { showBg,animation } = this.state
        let con = null
        console.log(animation)
        if(noAnimationPage.includes(pathname) && (!animation || animation === null)){
            console.log(123)
            con = children
        }else{
            con = this.animationPage(children)
        }
        const idName = pathname === "/" ? 'home' : 'careers'
        return(
            <>
            {/* <Bg show={showBg}/> */}
            <div id="main" style={{visibility: 'visible'}}>
                {/* <div id={idName} className={`${idName} page`}> */}
                    {con}
                {/* </div> */}
            </div>
          </>
        )
    }
}