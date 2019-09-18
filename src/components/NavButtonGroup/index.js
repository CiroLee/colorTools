import React , {useState} from 'react';
import {Link} from 'react-router-dom';
import config from '../../configs/config'
import IconHOC from '../IconHOC'
import './index.css';
const MyIcon = IconHOC(config.iconfontUrl);


export default props => {
    const nav_buttons = props.navButtons || [];
    const mainButton = props.mainButton || {};
    const [group_show,setGroupShow] = useState(false);
    
    return (
        <div className='nav-button-group'>
            <div className={group_show ? 'nav-group nav-button-group-transition':'nav-group-hide'}>
                {nav_buttons.map((item,index)=>(
                    <Link key={index} to={item.path} className='icon-btn' >
                        <MyIcon type={item.icon} style={item.style} />
                    </Link>
                ))}
            </div>
            <div className='icon-btn toggle-btn' onClick={()=>setGroupShow(!group_show)}>
                <MyIcon type={mainButton.icon} />
            </div>
        </div>
    );
}