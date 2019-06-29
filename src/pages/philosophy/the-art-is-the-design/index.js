import {PureComponent} from 'react'
import backIcon from '@/assets/images/breadcrumb_back.png'
import Bound from '@/components/bounding'
import router from 'umi/router'
import {connect} from 'dva'

export default
@connect(({global}) => ({
    loading:global.loading
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
        console.log('finish')
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
            <div id="the-art-is-the-design" className="philosophy-type page">
                <Bound finish={this.finish} back={back} end={this.leave}>
                    <div className="title-container">
                        <a href="#" onClick={this.back} className="breadcrumb-link">
                            <img src={backIcon} className="breadcrumb-icon" alt="Philosophy" title="Philosophy"/>
                            Back to Philosophy
                        </a>
                        <h1 className="page-title">The Art is the Design</h1>
                    </div>
                    <div className="content sly-frame">
                        <div className="sly-content" style={{ height: '100%', overflow: 'auto' }}>
                            <p>Rafauli’s philosophy to designing is one based not only in science but also in art.&nbsp; Each home Rafauli designs is a work of art in that it is original, creative and has the FR flair that he is sought out and well known for, while incorporating all the clients wants and needs.</p>
                            <p>Rafauli has developed a sterling reputation as an iconic and internationally recognized designer. He brings passion, edge and an unusual bravura in creative conception.&nbsp; He is known for integrating ultra luxury interior designs seamlessly into his house plans with each home he designs and builds allowing the high design to flow seamlessly from exterior through to the interiors.</p>
                            <p>Every aspect of the ultra luxury design---from awe inspiring elevations and grand floor plans to unique wall and ceiling designs to exotic flooring and fireplace designs, to lavish theatres, indoor pools, indoor basketball courts, wine cellars, kitchens, walk-in closet, man caves, ultra lux garages, indoor bowling alleys and sprawling master ensuites; are not only artistic but are also highly detailed and specified allowing for the ultimate in luxury interiors and precision construction.&nbsp;</p>
                            <p>Rafauli is not only known for grand homes of outstanding scale and scope but he is also known for obsessive attention to detail. His portfolio of distinctive homes and ultra luxury lifestyle creations has made him the first choice among a sophisticated clientele.</p>
                        </div>
                    </div>
                </Bound>
            </div>
        )
    }
}