import {PureComponent} from 'react'
import ferris from '@/assets/images/ferris_rafauli.jpg'
import bio from '@/assets/images/bio.jpg'
import th from '@/assets/images/360.jpg'
import turn from '@/assets/images/turn_key.jpg'
import title from '@/assets/images/ferris_rafauli.png'
import router from 'umi/router'

export default class extends PureComponent{
    componentDidMount(){
        const title = document.getElementsByClassName('page-title-section')[0]
        const content = document.getElementsByClassName('content')[0]
        const link = document.getElementsByClassName('philosophy-type-link')
        setTimeout(() => {
            title.style = 'transition:opacity 1s;opacity: 1'
            content.style = 'transition:opacity 1s;opacity: 1'
            link[0].style = 'transition:opacity 2s;opacity: 1'
            link[1].style = 'transition:opacity 4s;opacity: 1'
        },800)
    }
    link = (url) => (e) => {
        e.preventDefault()
        const title = document.getElementsByClassName('page-title-section')[0]
        const content = document.getElementsByClassName('content')[0]
        title.style = 'transition:opacity 1s;opacity: 0'
        content.style = 'transition:all 1.5s;opacity: 0;transform:translateY(100px)'
        setTimeout(() => {
            router.push(url)
        },1300)
    }
    render(){
        return(
            <div id="ferris-rafauli" className="philosophy page">
            <div className="static bounding-box">
                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-title-wrapper">
                            <div className="title-line"></div>
                            <img src={title} className="title-image" alt="Ferris Rafauli" title="Ferris Rafauli"/>
                            <div className="title-line"></div>
                        </span>
                    </h1>
                </div>
                <div className="content">
                    <a className="philosophy-type-link" id="design-and-architect-link" href="#" onClick={this.link('/philosophy/the-art-is-the-design')}>
                        <div className="fill block">
                            <span className="fill front face">
                                    <img alt='' className="fill" src={ferris}/>
                            </span>
                            <span className="fill bottom face">
                                    <img alt='' className="fill" src={bio}/>
                            </span>
                        </div>
                    </a>
                    <a className="philosophy-type-link" id="execute-and-build-link"  onClick={this.link("/philosophy/the-science-is-the-build")}>
                        <div className="fill block">
                            <span className="fill front face">
                                    <img alt='' className="fill" src={th}/>
                            </span>
                            <span className="fill bottom face">
                                    <img alt='' className="fill" src={turn}/>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        )
    }
}