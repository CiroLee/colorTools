import React from 'react';
import {Icon} from 'antd';
import NavCard from '../../components/NavCard';
import IconHOC from '../../components/IconHOC';
import config from '../../configs/config'
import './index.css'
const MyIcon = IconHOC(config.iconfontUrl);
export default props => {
    return (
        <div className='home-container'>
            <div className='github-btn'>
                <a href="https://github.com/CiroLee/colorTools" target='_blank' rel="noopener noreferrer" >
                    <Icon type='github' style={{fontSize:24,paddingRight:10}} />
                    github
                </a>
            </div>
            <div className='header'>在线调色工具</div>
            <div className='navigate-content'>
                <NavCard 
                    title='色板'
                    desc='常用配色色板'
                    path='/colorplate'
                    icon={<MyIcon type='colorplate' />}
                />
                <NavCard 
                    title='CSS渐变'
                    desc='css渐变工具'
                    path='/colorgradient'
                    icon={<MyIcon type='editcolors' />}
                />
            </div>
        </div>
    );
}