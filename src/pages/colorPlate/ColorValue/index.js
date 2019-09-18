import React from 'react';
import {Icon} from 'antd';
import {copyToClipboard} from '../../../utils/utils'
import './index.css';
export default props => {
    
    return (
        <div className='color-value-wrapper'>
            <div className='color-input'>{props.value}</div>
            <div className='color-copy-btn' onClick={()=>{copyToClipboard(props.value)}} >
                <Icon type="copy" />
            </div>
        </div>
    );
}