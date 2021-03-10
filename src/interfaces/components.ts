import * as Ants from 'antd/es';
export interface IProps {
    [x: string]: any;
};
export type ComponentName = keyof typeof Ants;
export enum COMPONENT_NAMES {
    BUTTON = 'Button',
    INPUT = 'Input',
    TABLE = 'Table',
    TYPOGRAPHY_TITLE = 'Typography.Title',
    TYPOGRAPHY_TEXT = 'Typography.Text', 
};
export interface IComponentConfig {
    componentName: COMPONENT_NAMES;
    props: IProps;
};
export interface IComponentNodeConfig {
    label: string;  //不能重复
    components: IComponentConfig[];
};