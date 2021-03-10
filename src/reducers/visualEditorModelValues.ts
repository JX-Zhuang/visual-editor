import React from "react";
import deepcopy from 'deepcopy';
import { IVisualEditorBlockData, IVisualEditorModelValue } from "../interfaces/visualEditor";
import { test } from '../config';
import visualModelExecuters from "../utils/visualModelExecuters";
import { createId } from '../utils/utils';
export enum actionType {
    RE_DO = 'REDO',
    UN_DO = 'UN_DO',    //撤销
    UPDATE_MODEL = 'UPDATE_MODEL',
    DELETE = 'DELETE',
    FORCE_UPDATE_MODEL = 'FORCE_UPDATE_MODEL',   //强制更新当前的model，不能撤销
    UPDATE_BLOCK = 'UPDATE_BLOCK',                  //更新block
    FORCE_UPDATE_BLOCK = 'FORCE_UPDATE_BLOCK',     //强制更新block，不能撤销
    CLEAR_ALL = 'CLEAR_ALL',
    COPY_BLOCK = 'COPY_BLOCK'
};
export interface IState {
    previousModels: IVisualEditorModelValue[];
    futureModels: IVisualEditorModelValue[];
    currentModel: IVisualEditorModelValue;
};
export interface IAction {
    type: actionType;
    payload: any;
}
export const initialState: IState = {
    previousModels: [], futureModels: [], currentModel: test
};
export const reducer = (state: IState, action: IAction): IState => {
    const { previousModels, currentModel, futureModels } = state;
    switch (action.type) {
        case actionType.CLEAR_ALL:
            return {
                previousModels: previousModels.concat(currentModel),
                currentModel: test,
                futureModels: []
            }
        case actionType.DELETE:
            const newCurrentModel: IVisualEditorModelValue = {
                container: currentModel.container,
                blocks: currentModel.blocks.filter((block) => !block.focus)
            };
            return {
                previousModels: previousModels.concat(currentModel),
                currentModel: newCurrentModel,
                futureModels: []
            }
        case actionType.FORCE_UPDATE_BLOCK: {
            return {
                previousModels,
                currentModel: visualModelExecuters.updateBlock(currentModel, {
                    ...action.payload
                }),
                futureModels
            }
        }
        case actionType.COPY_BLOCK: {
            const currentBlock = currentModel.blocks.find((block) => block.id === action.payload);
            if (!currentBlock) return state;
            return {
                previousModels: previousModels.concat(currentModel),
                currentModel: visualModelExecuters.addBlock(currentModel, Object.assign(deepcopy(currentBlock), {
                    id: createId(),
                    left: currentBlock.left + currentBlock.width,
                    top: currentBlock.top + currentBlock.height,
                    focus: false
                })),
                futureModels: []
            }
        }
        case actionType.FORCE_UPDATE_MODEL:
            return {
                previousModels,
                currentModel: action.payload,
                futureModels
            };
        case actionType.UPDATE_MODEL:
            return {
                previousModels: previousModels.concat(currentModel!),
                currentModel: deepcopy(action.payload),
                futureModels: [],
            };
        case actionType.UN_DO:
            if (previousModels.length <= 0) return state;
            const prevModel = previousModels[previousModels.length - 1];
            return {
                previousModels: previousModels.slice(0, previousModels.length - 1),
                currentModel: prevModel,
                futureModels: [currentModel!, ...futureModels]
            }
        case actionType.RE_DO:
            if (futureModels.length <= 0) return state;
            const next = futureModels[0];
            return {
                previousModels: previousModels.concat(currentModel!),
                currentModel: next,
                futureModels: futureModels.slice(1)
            }
        default:
            throw new Error("Unexpected action");
    }
};
export const actions = {
    updateModel: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
        type: actionType.UPDATE_MODEL,
        payload
    }),
    undo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.UN_DO, payload: {} }),
    redo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.RE_DO, payload: {} }),
    deleteAction: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.DELETE, payload: {} }),
    forceUpdateModel: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
        type: actionType.FORCE_UPDATE_MODEL,
        payload
    }),
    forceUpdateBlock: (dispatch: React.Dispatch<IAction>, payload: Partial<IVisualEditorBlockData>) => dispatch({
        type: actionType.FORCE_UPDATE_BLOCK,
        payload
    }),
    clearAll: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.CLEAR_ALL, payload: {} }),
    copyBlock: (dispatch: React.Dispatch<IAction>, id: string) => dispatch({ type: actionType.COPY_BLOCK, payload: id })
};
export type ActionsType = typeof actions;