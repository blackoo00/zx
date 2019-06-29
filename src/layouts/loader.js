import { PureComponent } from 'react'
import loading from '../assets/images/loader-20f5038f4645659bfaa3f5ccf93378fc.gif'
import styles  from './less/loader.less'
import {connect} from 'dva'

export default @connect(({global}) => ({
    loading:global.loading,
    pageAnimation:global.pageAnimation
}))
class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            show:true
        }
    }
    componentDidUpdate(prevProps){
        const {loading,dispatch} = this.props
        if(loading != prevProps.loading){
            this.setState({
                show:loading
            })
        }
    }
    componentDidMount(){
        const {loading} = this.props
        if(loading){
            this.setState({
                show:true
            })
        }
    }
    render() {
        const {show} = this.state
        return (
            <div id="loader-bg" className={show ? styles.show : styles.hide}>
                <img alt="Loader" height="10" id="loader" src={loading} width="80" />
            </div>
        );
    }
}