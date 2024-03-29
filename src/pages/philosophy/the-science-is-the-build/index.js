import {PureComponent} from 'react'
import backIcon from '@/assets/images/breadcrumb_back.png'
import Bound from '@/components/bounding'
import router from 'umi/router'
import {connect} from 'dva'

export default
@connect(({global}) => ({
    loading:global.loading,
    pageChange:global.loading
}))
class extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            back:false
        }
    }
    componentDidMount(){
        const {dispatch} = this.props
        setTimeout(() => {
            dispatch({
                type:'global/handleLoading',
                payload:false
            })
        },1000)
    }
    finish = () => {
        const title = document.getElementsByClassName('title-container')[0]
        title.style = 'opacity:1;filter:none;transition:opacity 1s'
    }
    leave = () => {
        const title = document.getElementsByClassName('title-container')[0]
        title.style = 'opacity:0;filter:none;transition:opacity 300ms'
    }
    back = e => {
        e.preventDefault()
        this.leave()
        const {dispatch} = this.props
        dispatch({
            type:'global/pageChange',
            payload:true
        })
        this.setState({
            back:true
        },() => {
            setTimeout(() => {
                router.push('/philosophy')
            },700)
        })
    }
    render(){
        const {back} = this.state
        const {loading} = this.props
        if(loading) return null
        return(
            <div id="the-science-is-the-build" className="philosophy-type page">
                <Bound finish={this.finish} back={back} end={this.leave}>
                    <div className="title-container">
                        <a href="#" onClick={this.back} className="breadcrumb-link">
                            <img src={backIcon} className="breadcrumb-icon" alt="Philosophy" title="Philosophy"/>
                            Back to Philosophy
                        </a>
                        <h1 className="page-title">The Science is the Build</h1>
                    </div>
                    <div className="content sly-frame">
                        <div className="sly-content" style={{ height: '100%', overflow: 'auto' }}>
                            <p>Most designers do just that—Design. Ferris Rafauli is unique in that he both Designs and Builds.</p>
                            <p>Ferris Rafauli’s philosophy is that the art of design alone is not enough. Understanding how to execute the build of a design at the designing stage is critical as it ensures the integrity of the design is fulfilled from conception through to construction. There is no risk of disconnect between the design and the construction.&nbsp; The soul of the design is never compromised.</p>
                            <p>From the waterproofing of the foundation, to the framing of the structure, to the installation of the final finishes, each stage of construction is executed with precision and perfection.</p>
                            <p>Ferris Rafauli has built some of the largest and most complicated homes in the country, mastering the science of the build. Clients will benefit from this experience and can be rest assured that their home will be not only designed at the highest level but will also be built with precision and excellence.</p>
                            <p>The result is the perfect blend between the art of the design and the science of the build. Perfect lines, impeccable craftsmanship and high quality fit and finishes are the hallmarks of Rafauli's work.</p>
                        </div>
                    </div>
                </Bound>
            </div>
        )
    }
}