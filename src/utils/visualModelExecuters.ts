import { IVisualEditorModelValue, IVisualEditorContainerData, IVisualEditorBlockData } from "../interfaces/visualEditor"
const updateContainer = (modelValue: IVisualEditorModelValue, container: Partial<IVisualEditorContainerData>): IVisualEditorModelValue => {
    return {
        container: {
            ...modelValue.container,
            ...container,
        },
        blocks: modelValue.blocks
    }
};
const deleteBlocks = (modelValue: IVisualEditorModelValue, ids: string[]): IVisualEditorModelValue => {
    return {
        container: modelValue.container,
        blocks: modelValue.blocks.filter(block => !ids.includes(block.id))
    }
};
const addBlock = (modelValue: IVisualEditorModelValue, block: IVisualEditorBlockData): IVisualEditorModelValue => {
    return {
        container: modelValue.container,
        blocks: modelValue.blocks.concat(block)
    }
};
const updateBlock = (modelValue: IVisualEditorModelValue, block: Partial<IVisualEditorBlockData>): IVisualEditorModelValue => {
    return {
        container: modelValue.container,
        blocks: modelValue.blocks.map(item => item.id === block.id ? ({
            ...item,
            ...block
        }) : item)
    }
};
// todo
const updateBlocks = (modelValue: IVisualEditorModelValue, blocks: IVisualEditorBlockData[]): IVisualEditorModelValue => {
    return {
        container: modelValue.container,
        blocks
    }
};
const updateFocusBlocks = (modelValue: IVisualEditorModelValue, block: Partial<IVisualEditorBlockData>): IVisualEditorModelValue => {
    return {
        container: modelValue.container,
        blocks: modelValue.blocks.map(item => item.focus ? ({
            ...item,
            ...block
        }) : item)
    };
};
const visualModelExecuters = {
    updateContainer,
    deleteBlocks,
    updateBlocks,
    addBlock,
    updateBlock,
    updateFocusBlocks
};
export default visualModelExecuters;