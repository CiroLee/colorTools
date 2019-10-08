import React , {useState} from 'react';
import {Button,Popover,Slider} from 'antd';
import config from '../../../configs/config'
import IconHOC from '../../../components/IconHOC'
import { ChromePicker } from 'react-color';
import {copyToClipboard} from '../../../utils/utils'
import './index.css';
const MyIcon = IconHOC(config.iconfontUrl);

const GRADIENT_RULE = {
    2:['0%','100%'],
    3:['0%','50%','100%'],
    4:['0%','25%','50%','100%'],
    5:['0%','13%','25%','50%','100%']

}
//设置颜色百分比
const setColorPercent = (colors)=>{
    let percentArray = GRADIENT_RULE[colors.length];
    if(!percentArray){
        return false;
    }
    return colors.map((item,index)=>{
        item.percent = percentArray[index];
        return item;
    })
}
//带删除的colorpicker
const MyColorPicker = props => {
    const {index,color,onChange,onDelete,length} = props;
    return (
        <div>
            <ChromePicker color={color} onChange={onChange} />
            {length > 2 ?
                <div style={{textAlign:'center',paddingTop:6}}>
                    <Button type='link' icon='delete' onClick={()=>{onDelete(index)}} />
                </div>
                :
                null
            }
        </div>
    );
}

//颜色百分比slider
const PercentSlider = props=>{
    const {colors,onChange} = props; 
    return (
        <div>
            {colors.map((item,index)=>(
                <Slider style={{width:240}} key={index} min={0} max={100} value={item.percent.replace('%','') - 0} onChange={(value)=>{onChange(value,index)}} />
            ))}
        </div>
    )
}


//解析渐变色为对象
const exactGradientToObj = (gradient)=>{
    let gradientArray = gradient.replace('linear-gradient','').replace(/[(|)]/g,'').split(',');
    let colors = gradientArray.filter((item,index)=>index).map(color=>{
        color = color.split(' ');
        return {color:color[0],percent:color[1]}
    });
    return {
        angle:gradientArray[0],
        colors
    }
}
//解析渐变色为字符串
const exactGradientToStr = gradientObj=>{
    let colorsArray = gradientObj.colors.map(item=>`${item.color} ${item.percent}`);
    return 'linear-gradient(' + [gradientObj.angle,...colorsArray].join(',') + ')';
}

export default props => {
    const [gradient,setGradient] = useState(props.gradient);
    const [gradientObj,setGradientObj] = useState(exactGradientToObj(gradient));
    
    //修改gradientObj
    const handleChangeGradientObj = gradientObj=>{
        setGradientObj(preState=>({
            ...preState,
            ...gradientObj
        }));
    }
    
    //修改颜色
    const changeColor = (color,index)=>{
        let _color = '';
        const {hex,rgb} = color;
        if(rgb.a < 1){
            _color = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
        }
        else {_color = hex;}
        gradientObj.colors[index].color = _color;
        
        handleChangeGradientObj(gradientObj);
        setGradient(exactGradientToStr(gradientObj));
    }

    //增加颜色
    const addColor = ()=>{
        let addItem = {color:'#ffffff',percent:'100%'};
        gradientObj.colors.push(addItem);
        gradientObj.colors = setColorPercent(gradientObj.colors) ? setColorPercent(gradientObj.colors):gradientObj.colors;

        handleChangeGradientObj(gradientObj);
        setGradient(exactGradientToStr(gradientObj));
    }

    //删除颜色
    const deleteColor = index=>{
        console.log(index);
        gradientObj.colors = gradientObj.colors.filter((item,key)=>{
            if(key !== index) return item;
        });
        gradientObj.colors = setColorPercent(gradientObj.colors) ? setColorPercent(gradientObj.colors):gradientObj.colors;

        handleChangeGradientObj(gradientObj);
        setGradient(exactGradientToStr(gradientObj));
    }

    //改变角度
    const changeAngle = value=>{
        gradientObj.angle = value + 'deg';

        handleChangeGradientObj(gradientObj);
        setGradient(exactGradientToStr(gradientObj));

    }

    //改变颜色百分比
    const changePercent = (percent,index)=>{
        gradientObj.colors[index].percent = percent + '%';

        handleChangeGradientObj(gradientObj);
        setGradient(exactGradientToStr(gradientObj));

    }

    //复制渐变色
    const copyGradient = ()=>{
        //console.log(gradient,props.compatibility);
        let result = props.compatibility.map(item=>`background-image:${item}${gradient};`).join('\n');
        result = `background-image:${gradient};\n${result}`;
        copyToClipboard(result);
    }

    //重置
    const reSetGradient = ()=>{
        setGradient(props.gradient);
        handleChangeGradientObj(exactGradientToObj(props.gradient))
    }
    
    return (
        <div className='gradient-wrapper'>
            <div className='circle-gradient-zone' style={{backgroundImage:gradient}}></div>
            <div className='color-btns'>
                {gradientObj.colors.map((item,index)=>(
                    <Popover
                        key={index} 
                        trigger='click'
                        placement='bottom'
                        content={
                            <MyColorPicker index={index} length={gradientObj.colors.length} color={item.color} onChange={(color)=>{changeColor(color,index)}} onDelete={deleteColor} />
                        }
                     >
                       <div className='color-circle-btn' style={{background:item.color}}></div>
                    </Popover>
                ))}
                
            </div>
            <div className='gradient-setting'>
                <Button icon="plus" type='link' className='setting-icon' disabled={gradientObj.colors.length ===5} onClick={addColor}/>
                <Popover 
                    title='角度'
                    trigger='click' 
                    placement='bottom'
                    content={<Slider style={{width:240}} min={0} max={360} value={gradientObj.angle.replace('deg','') - 0} onChange={changeAngle} />}
                >
                    <Button type='link' className='setting-icon' style={{padding:0,fontSize:21}}>
                        <MyIcon type='angle' />
                    </Button>
                </Popover>
                <Popover
                    title='比例(%)'
                    trigger='click'
                    placement='bottom'
                    content={<PercentSlider colors={gradientObj.colors} onChange={changePercent}/>}
                >
                    <Button icon="setting" type='link' className='setting-icon' />
                </Popover>
                <Button icon="redo" type='link' className='setting-icon' onClick={reSetGradient} />
                <Button icon="copy" type='link' className='setting-icon' onClick={copyGradient} />
            </div>
        </div>
    )
}