import { PureComponent } from 'react'
import loading from '../assets/images/loader-20f5038f4645659bfaa3f5ccf93378fc.gif'
import styles  from './less/loader.less'

class BasicLayout extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            show:false
        }
    }
    componentDidMount(){
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

export default BasicLayout;
