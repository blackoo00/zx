import { PureComponent } from 'react'
import bstyles from '../../layouts/less/bounding.less'
import {connect} from 'dva'
import Bound from '@/components/bounding/'

export default
@connect(({global}) => ({animation:global.animation}))
class extends PureComponent {
    finish = () => {
        document.getElementsByClassName('title-container')[0].classList.add(bstyles.boundingTitle)
    }
    end = () => {
        document.getElementsByClassName('title-container')[0].classList.add(bstyles.boundingTitleOut)
    }
    render() {
        return (
            <div id="careers" className="careers page">
                <Bound finish = {this.finish} end={this.end}>
                    <div className="title-container">
                        <h1 className="page-title">Careers</h1>
                    </div>
                    <div className="content sly-frame careers-content">
                        <div className="sly-content" style={{ height: '100%', overflow: 'auto' }}>
                            <p>We are always interested in having people who are as passionate about architecture and design as we are join our team. Please see available positions below:</p>
                            <h2>DESIGN</h2>
                            <p>If you’re looking to be a part of a creative design team responsible for ultra luxury designs of some of the most notable and iconic residential and commercial projects in North America and Worldwide we are currently looking to add the following to our team:</p>
                            <p>- FF&amp;E Designer (Senior)<br />- Designers (Intermediate)<br />- Designers (Senior)<br />- Architect (Senior)</p>
                            <p>Please contact Brad Rafauli, Vice President: <a href="mailto:Brad@grandeur.ca">Brad@grandeur.ca</a> | 905-845-3733 x 103<br />You can also send your resume via e-mail or fax:&nbsp;<a href="mailto:careers@grandeur.ca">careers@grandeur.ca</a> | Fax: 905.639.1570</p>
                            <h2>CONSTRUCTION</h2>
                            <p>If your looking to be a part of a construction team responsible for building complex and iconic structures in the world of residential we are currently looking to add the following to our team:</p>
                            <p>- Site Supervisor (Senior)<br />- Labour</p>
                            <p>Please contact Brad Rafauli, Vice President: <a href="mailto:Brad@grandeur.ca">Brad@grandeur.ca</a> | 905-845-3733 x 103<br />You can also send your resume via e-mail or fax:&nbsp;<a href="mailto:careers@grandeur.ca">careers@grandeur.ca</a> | Fax: 905.639.1570</p>
                        </div>
                    </div>
                </Bound>
            </div>
        );
    }
}