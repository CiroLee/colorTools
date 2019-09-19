import React from 'react';
import {copyToClipboard} from '../../../utils/utils';
import './index.css';
export default props => {
    const {colorTable} = props;

    //click to copy
  const CopyColor = color=>{
    if(props.setColor){
        props.setColor(color)
    }
    copyToClipboard(color);
  }

    return (
        <div className='colorcard-group'>
            <div className='group-title'>{colorTable.name}</div>
            <div className='group-content'>
            {colorTable.color.map((item,index)=>(
                <div 
                className='colorcard-wrapper' 
                key={`color-${index}`} 
                style={{backgroundColor:item}}
                onClick={()=>{CopyColor(item)}}
                >
                    <div className='color-hex'>{item}</div>
                </div>
            ))}
            </div>
        </div>
    );
}