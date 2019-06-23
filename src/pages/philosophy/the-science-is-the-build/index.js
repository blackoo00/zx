import {PureComponent} from 'react'
import backIcon from '@/assets/images/breadcrumb_back.png'
import Bound from '@/components/bounding'
import router from 'umi/router'
import {connect} from 'dva'

export default

class extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            back:false
        }
    }
    componentDidMount(){

    }
    finish = () => {
        const title = document.getElementsByClassName('title-container')[0]
        title.style = 'opacity:1;filter:none;transition:opacity 1s'
    }
    back = e => {
        e.preventDefault()
        const title = document.getElementsByClassName('title-container')[0]
        this.setState({
            back:true
        },() => {
            title.style = 'opacity:0;filter:none;transition:opacity 300ms'
            setTimeout(() => {
                router.push('/philosophy')
            },700)
        })
    }
    render(){
        const {back} = this.state
        console.log(back)
        return(
            <div id="the-science-is-the-build" class="philosophy-type page">
                <Bound finish={this.finish} back={back}>
                    <div class="title-container">
                        <a href="#" onClick={this.back} class="breadcrumb-link">
                            <img src={backIcon} class="breadcrumb-icon" alt="Philosophy" title="Philosophy"/>
                            Back to Philosophy
                        </a>
                        <h1 class="page-title">The Science is the Build</h1>
                    </div>
                    <div class="content sly-frame">
                        <div class="sly-content" style={{ height: '100%', overflow: 'auto' }}>
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