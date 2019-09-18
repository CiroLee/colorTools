import React , {useState} from 'react';
import {Tabs} from 'antd';
import ColorSlider from './ColorSlider';
import ColorValue from './ColorValue';
import colorplateConfig from '../../configs/colorplate.config';
import {HexToRGB} from '../../utils/utils'
import './index.css';
const { TabPane } = Tabs;
export default props => {
    const [color,setColor] = useState('#69c0ff');
    const [rgb,setRGB] = useState(HexToRGB(color).format);

    const handleSetColor = color=>{
        setColor(color);
        let rgb = HexToRGB(color);
        setRGB(rgb.format)
    }
    return (
        <div className='colorplate-wrapper'>
            <div className='color-showing' style={{backgroundColor:color}}></div>
            <div className='colorplate'>
                <div className='color-value'>
                    <ColorValue value={color} />
                    <ColorValue value={rgb} />
                </div>
                <div className='colorslider'>
                    <Tabs defaultActiveKey='ant' >
                        <TabPane tab='Ant' key='ant'>
                            {colorplateConfig.ant.map((item,index)=>(
                                <ColorSlider key={index} slider={item} setColor={handleSetColor} />
                            ))}
                        </TabPane>
                        <TabPane tab='Material' key='material'></TabPane>
                        <TabPane tab='ColorTale' key='colortale'></TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}