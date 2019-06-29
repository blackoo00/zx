import { PureComponent } from 'react'
import {connect} from 'dva'
import Bound from '@/components/bounding/'
import title from '@/assets/images/contact.png'
import styles from './index.less'

export default
@connect(({global}) => ({
    loading:global.loading
}))
class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            showMap:false
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
        document.getElementsByClassName('bounding-box-top-shadow')[0].style = 'visibility: visible; opacity: 1'
        document.getElementsByClassName('bounding-box-bottom-shadow')[0].style = 'visibility: visible; opacity: 1'
        document.getElementsByClassName('page-title-section')[0].style = 'visibility: visible; opacity: 1'
    }
    end = () => {
    }
    showMap = e => {
        e.preventDefault()
        const div = document.getElementById('streeview-toggle')
        this.setState({
            showMap:!this.state.showMap
        })
        setTimeout(() => {
            div.classList.remove(styles.toggle)
        },1200)
        div.classList.add(styles.toggle)
    }
    render() {
        const {loading} = this.props
        if(loading) return null
        return (
            <div id="contact" className="contact page">
                <Bound finish = {this.finish} end={this.end}>
                    <div className="bounding-box-top-shadow"></div>
                    <div className="bounding-box-bottom-shadow"></div>
                    <div className="page-title-section">
                        <h1 className="page-title">
                            <span className="page-title-wrapper">
                                <div className="title-line"></div>
                                <img src={title} className="title-image" alt="Contact" title="Contact"/>
                                <div className="title-line"></div>
                            </span>
                        </h1>
                    </div>
                    <div className="content sly-frame">
                        <div className="sly-content" style={{ height: '100%', overflow: 'auto' }}>
                            <div className="center column">
                                <h1>Design Studio:</h1>
                                <p>For design services inquiries, please contact 905-845-3733 Ext. 101 or <a href="mailto:info@grandeur.ca">info@grandeur.ca</a><a href="mailto:architecture@grandeur.ca"><br/></a></p>
                                <p>For general inquiries, please contact 905-845-3733 Ext. 101 or <a href="mailto:info@grandeur.ca">info@grandeur.ca</a></p>
                                <p>For media and press, please contact 905-845-3733 Ext. 103 or <a href="mailto:media@grandeur.ca">media@grandeur.ca</a></p>
                                <h1>Location:</h1>
                                <p>Ferris Rafauli Design&nbsp;<br/>1540 Cornwall Road, Suite 200<br/>Oakville, Ontario <br/>L6J 7W5</p>
                            </div>
                        </div>
                    </div>
                </Bound>
                <a onClick={this.showMap} id="streeview-toggle" className="toggler-view-button" style={{opacity: 1}}>View Map</a>
                <a href="#" id="directions" target="_blank" style={{opacity: 1}}>Directions</a>
            </div>
        );
    }
}