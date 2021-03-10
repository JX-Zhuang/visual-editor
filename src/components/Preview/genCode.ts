import { IVisualEditorModelValue } from "../../interfaces/visualEditor";
const genImportComponentsLib = ({ blocks }: IVisualEditorModelValue) => {
    const componentNameSet = new Set();
    blocks.forEach((block) => {
        const componentNames = block.componentName.split('.');
        componentNameSet.add(componentNames.length > 0 ? componentNames[0] : componentNames);
    });
    return `import {${Array.from(componentNameSet).join(',')}} from 'antd';
     import 'antd/dist/antd.css';`;
};
const genPropsValue = (value: string | boolean | number | object) => {
    if (typeof value === 'boolean' || typeof value === 'number') return value;
    if (typeof value === 'string') return `'${value}'`;
    if (typeof value === 'object') return JSON.stringify(value);
};
const genProps = (props: { [x: string]: any }) => {
    let propsString = '';
    for (const key in props) {
        propsString += ` ${key}={${genPropsValue(props[key])}}`;
    }
    return propsString;
};
const genComponent = ({ blocks }: IVisualEditorModelValue) => {
    return blocks.reduce((prev, { componentName, props, left, top }) => {
        const style = {
            position: 'absolute',
            left: `${left}px`,
            top: `${top}px`
        };
        return `${prev}
    <div style={${JSON.stringify(style)}}>
        <${componentName}  ${genProps(props)}/>
    </div>`
    }, '');
};
const genCode = (code: IVisualEditorModelValue) => {
    const containerStyle = {
        height: code.container.height + 'px',
        width: code.container.width + 'px'
    };
    return `
     import React from 'react';
     ${genImportComponentsLib(code)}
     const Component:React.FC<any> = props=>{
         return (
     <div style={${JSON.stringify(containerStyle)}}>
         ${genComponent(code)}
     </div>
)
     };
     export default Component;
    `
}
export default genCode;