import { IVisualEditorBlockData, IVisualEditorComponent, IVisualEditorComponentNode } from "../interfaces/visualEditor";
export const createId = () => String(Date.now());
export function createVisualEditorConfig() {
    const componentNodeList: IVisualEditorComponentNode[] = [];
    const componentMap: Record<string, IVisualEditorComponent> = {};
    return {
        registry({ id, label, components }: IVisualEditorComponentNode) {
            componentNodeList.push({
                id, label, components
            });
            components.forEach((component) => {
                componentMap[component.key] = { ...component };
            });
        },
        componentNodeList,
        componentMap
    }
};
export function creatNewBlock({
    component,
    top, left
}: {
    component: IVisualEditorComponent;
    top: number;
    left: number
}): IVisualEditorBlockData {
    return {
        id: createId(),
        componentKey: component.key,
        top,
        left,
        adjustPosition: true,
        focus: false,
        componentName: component.componentName,
        props: component.props,
        width: 0,
        height: 0,
        hasResize: false
    }
}
export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>;