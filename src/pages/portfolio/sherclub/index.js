import { PureComponent } from 'react'
import pic from '@/assets/images/test.jpeg'
import router from 'umi/router'
import {connect} from 'dva'

export default
@connect()
class extends PureComponent {
    x = 0
    constructor(props) {
        super(props)
        let list = []
        for (let i = 1; i < 5; i++) {
            list.push({
                id: i,
                src: pic,
            })
        }
        list[0]['status'] = 'active'
        list[1]['status'] = 'ready'
        this.state = {
            list: list,
            showNum: 0,
            prev:false,
            next:true
        }
    }
    componentDidMount(){
        const {dispatch} = this.props
        const _this = this
        setTimeout(() => {
            dispatch({
                type:'global/handleLoading',
                payload:false
            })
            _this.pageIn()
        },1000)
    }
    pageIn = () => {
        setTimeout(() => {
            const lis = document.getElementsByClassName('full-gallery-image')
            let width = 0
            for(let item of lis){
                width += item['offsetWidth']
            }
            const firstLiWidth = lis[0]['offsetWidth']
            const wrap = document.getElementById('full-gallery')
            const ul = document.getElementById('sherclubul')
            const clintWidth = document.documentElement.clientWidth;
            const x = Math.ceil((clintWidth - firstLiWidth) / 2)
            this.x = x
            wrap.style['opacity'] = 1
            ul.style['width'] = width + 'px'
            ul.style['transform'] = 'translate3d('+ x +'px,0,0)'
        },100)
    }
    prev = (e) => {
        e.preventDefault()
        const {next,prev,list,showNum} = this.state
        if(!next){
            this.setState({
                next:true
            })
        }
        if(!prev){
            return
        }
        if(showNum > 1){
            const newShowNum = showNum - 1
            list[showNum]['status'] = 'ready'
            list[newShowNum]['status'] = 'active'
            list[newShowNum -1]['status'] = 'ready'
            this.setState({
                showNum:newShowNum,
                list:list
            })
        }
        if(showNum === 1){
            const newShowNum = 0
            list[showNum]['status'] = 'ready'
            list[newShowNum]['status'] = 'active'
            this.setState({
                showNum:newShowNum,
                list:list,
                prev:false
            })
        }
        const liWidth = document.getElementsByClassName('full-gallery-image')[showNum]['offsetWidth']
        this.translate3d(liWidth)
    }
    next = (e) => {
        e.preventDefault()
        const {prev,showNum,list,next} = this.state
        if(!prev){
            this.setState({
                prev:true
            })
        }
        if(!next){
            return
        }
        if(showNum < (list.length - 2)){
            const newShowNum = showNum + 1
            list[showNum]['status'] = 'ready'
            list[newShowNum]['status'] = 'active'
            list[newShowNum + 1]['status'] = 'ready'
            this.setState({
                showNum:newShowNum,
                list:list
            })
        }
        if(showNum === (list.length - 2)){
            const newShowNum = showNum + 1
            list[showNum]['status'] = 'ready'
            list[newShowNum]['status'] = 'active'
            this.setState({
                showNum:newShowNum,
                list:list,
                next:false
            })
        }
        const liWidth = document.getElementsByClassName('full-gallery-image')[showNum]['offsetWidth']
        this.translate3d(-liWidth)
    }
    translate3d = (x) => {
        const translateX = this.x + x
        this.x = translateX
        let div = document.getElementById('sherclubul')
        div.style['transform'] = 'translate3d('+ translateX +'px,0,0)'
        div.style['transition'] = 'transform 500ms'
    }
    back = e => {
        e.preventDefault()
        router.push('/portfolio')
    }
    render() {
        const { list,prev,next } = this.state
        return (
            <div id="full-gallery" className="active">
                <div id="sherclub" className="full-gallery-desktop page">
                    <div className="full-gallery-sly gallery-images" style={{ overflow: 'hidden' }}>
                        <ul className="full-gallery-images" id="sherclubul">
                            {list.map(item => (
                                <li key={item.id} className={`full-gallery-image ${item.status}`}>
                                    <img alt='' className="full-gallery-img" src={item.src} data-src={item.src} />
                                    <div className="full-gallery-img-guard"></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a onClick={this.prev} className={`full-gallery-button prev ${prev ? '' : 'disabled'}`} href="" style={{ left: '0px' }}></a>
                    <a onClick={this.next} className={`full-gallery-button next  ${next ? '' : 'disabled'}`} href="" style={{ right: '0px' }}></a>
                    <a onClick={this.back} className="full-gallery-button close" href="portfolio">View Other Work</a>
                    <a className="full-gallery-button info">About Sher club</a>
                </div>
            </div>
        )
    }
}