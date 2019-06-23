import logo1 from '../assets/images/logo-346b2a2ba461ed94b5068dc75b317f7c.png'
import logo2 from '../assets/images/logo_text-3228226b048d5a3d12382f3233c93456.png'
import logo3 from '../assets/images/logo-glint-598fc2791328b61f0c0ea7f307fcdbad.png'
import styles from './index.less'
import {PureComponent} from 'react'

export default class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            show:false,
            glint:1
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                show:true
            })
        }, 100)
        let num = 1
        setInterval(() => {
            num === 4 ? num = 1 : num ++
            this.setState({
                glint:num
            })
        },(1200 - num *100))
    }
    render(){
        const {show,glint} = this.state
        return (
            <a id="home-link" className={show ? styles.logo : ''} href="/remove_session" title="Ferris Rafauli | Home" data-ajax="false">
            {/* <a id="home-link" className={styles.logo} href="/remove_session" title="Ferris Rafauli | Home" data-ajax="false"> */}
                <img alt="Logo" height="122" id="home-logo" src={logo1} width="165" />
                <img alt="Logo_text" height="35" id="logo-text" src={logo2} width="199" />
                <div id="logo-glints">
                    <img alt="Logo-glint" className={`logo-glint ${glint === 1 ? styles.glint: ``}`} height="83" id="glint1"
                        src={logo3} width="115" />
                    <img alt="Logo-glint" className={`logo-glint ${glint === 2 ? styles.glint: ``}`} height="48" id="glint2"
                        src={logo3} width="67" />
                    <img alt="Logo-glint" className={`logo-glint ${glint === 3 ? styles.glint: ``}`} height="48" id="glint3"
                        src={logo3} width="67" />
                    <img alt="Logo-glint" className={`logo-glint ${glint === 4 ? styles.glint: ``}`} height="83" id="glint4"
                        src={logo3} width="115" />
                </div>
            </a>
        )
    }
}