import React ,{useState} from 'react';
import {Checkbox} from 'antd'
import Gradient from './Gradient';
import gradientConfig from '../../configs/gradient.config'
import './index.css';
export default props => {
    const options = [
        {label:'Chrome',value:'-webkit-'},
        {label:'firefox',value:'-moz-'},
        {label:'opera',value:'-o-'}
    ];
    const [compatible_array,setCompatibleArray] = useState(['-webkit-','-moz-','-o-']);

    //修改兼容性数组
    const changeCompatibleArray = value =>{
        setCompatibleArray(value)
    }

    return (
        <div className='colorgradient-container'>
            <div className='compatible-zone'>
                <div className='compatible-title'>兼容配置</div>
                <div>
                    <Checkbox.Group options={options} defaultValue={['-webkit-','-moz-','-o-']} onChange={changeCompatibleArray} />
                </div>
            </div>
            <div className='colorgradient-content'>
                {gradientConfig.map((item,index)=>(
                    <Gradient key={index} gradient={item} compatibility={compatible_array} />
                ))}
            </div>
        </div>
    );
}