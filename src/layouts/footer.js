import line from '../assets/images/whole_line-5c34ee2c49313ba3924f7431ed856612.png'
import styles from './index.less'
import Link from 'umi/link'
import {PureComponent} from 'react'
import {connect} from 'dva'
import router from 'umi/router'

const noPageAn = ['/','/philosophy','/ferris-rafauli']
export default
@connect(({global,router}) => ({
    pageChange:global.pageChange,
    pathname:router.location.pathname
}))
class extends PureComponent{
    url = ''
    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log(prevProps)
        // console.log(this.props)
        // const {pageChange} = this.props
        // const prevPageChange = prevProps.pageChange
        // if(!pageChange && pageChange !== prevPageChange){
        //     console.log(this.url)
        //     router.push(this.url)
        // }
    }
    link = (url) => (e) => {
        e.preventDefault()
        const {dispatch,pathname} = this.props
        if(noPageAn.includes(pathname)){
            router.push(url)
            return
        }else{
            dispatch({
                type:'global/pageChange',
                payload:true
            })
            setTimeout(() => {
                router.push(url)
            },1000)
        }
    }
    render(){
        const {pathname} = this.props
        if(pathname === "/portfolio/sherclub") return null
        return(
            <>
                <div id="menu" className={styles.footer}>
                    <a id="menu-button"></a>
                    <div id="menu-mask">
                        <ul id="menu-lines">
                            <li className="menu-line first" id="ml1"></li>
                            <li className="menu-line" id="ml2"></li>
                            <li className="menu-line" id="ml3"></li>
                            <li className="menu-line" id="ml4"></li>
                            <li className="menu-line" id="ml5"></li>
                            <li className="menu-line" id="ml6"></li>
                            <li className="menu-line last" id="ml7"></li>
                            <li className="menu-line" id="whole-line"><img alt="Whole_line" id="line-img" src={line}/></li>
                        </ul>
                        <ul id="menu-links">
                            <li id="m1" className="menu-li"><a onClick={this.link('/')} className="menu-a">Home</a></li>
                            <li id="m2" className="menu-li"><a onClick={this.link('/ferris-rafauli')} className="menu-a">Ferris Rafauli</a></li>
                            <li id="m3" className="menu-li"><a onClick={this.link('/portfolio')} className="menu-a">Portfolio</a></li>
                            <li id="m4" className="menu-li"><a onClick={this.link('philosophy')} className="menu-a">Philosophy</a></li>
                            <li id="m5" className="menu-li"><a onClick={this.link('/careers')} className="menu-a">Careers</a></li>
                            <li id="m6" className="menu-li"><a onClick={this.link()} className="menu-a">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div id="menu-glow-mask">
                    <div id="menu-glow"></div>
                </div>
            </>
        )
    }
}