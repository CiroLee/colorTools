import React from "react";
import {Tooltip} from 'antd';
import {copyToClipboard} from '../../../utils/utils'
import "./index.css";
export default props => {
  const { name, theme, color } = props.slider;
  //click to copy
  const CopyColor = color=>{
      if(props.setColor){
          props.setColor(color)
      }
      copyToClipboard(color);
  }
  return (
    <div>
      <div className="colorslider-header">
        <span>{name}</span>
        <span>{theme}</span>
      </div>
      <div className='slider-content'>
        {color.map((item, index) => (
          <Tooltip title={item} key={index} >
            <div className="slider-block" style={{backgroundColor:item}} onClick={()=>{CopyColor(item)}}></div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
