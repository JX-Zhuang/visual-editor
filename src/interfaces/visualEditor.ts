import { COMPONENT_NAMES, IProps } from "./components";
export interface IVisualEditorBlockData {
    id: string;
    componentName: COMPONENT_NAMES;           //组件名称，生成代码时需要用componentName对应真正的组件
    componentKey: string;
    top: number;
    left: number;
    adjustPosition: boolean;    //是否需要自动调整位置
    focus: boolean;  //是否为选中状态
    width: number;   //组件宽度
    height: number;
    hasResize: boolean; //是否调整过宽高
    props: {
        [x: string]: any;
    }
}
export interface IVisualEditorContainerData {
    width: number;
    height: number;
    background: string;
}
export interface IVisualEditorModelValue {
    container: IVisualEditorContainerData;
    blocks: IVisualEditorBlockData[]
}
export interface IVisualEditorComponent {
    label: string;
    key: string;
    preview(): JSX.Element;
    render(props: IProps): JSX.Element;
    props: {
        [x: string]: any;
    }
    componentName: COMPONENT_NAMES;   //组件名称，生成代码时需要用componentName对应真正的组件
}
export interface IVisualEditorComponentNode {
    id: string;
    label: string;
    components: IVisualEditorComponent[];
}
export interface IVisualEditorMarkLines {
    x: { left: number; showLeft: number }[];
    y: { top: number; showTop: number }[];
}