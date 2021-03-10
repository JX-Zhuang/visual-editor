import React from "react";
import deepcopy from 'deepcopy';
import { IVisualEditorModelValue } from "../interfaces/visualEditor";
import { test } from '../config';
export enum actionType {
    RE_DO = 'REDO',
    UN_DO = 'UN_DO',    //撤销
    DROP_END = 'DROP_END',
    DELETE = 'DELETE',
    FORCE_UPDATE_MODEL = 'FORCE_UPDATE_MODEL'   //强制更新当前的model，不能撤销
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
    console.log(action.type)
    switch (action.type) {
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
        case actionType.FORCE_UPDATE_MODEL:
            return {
                previousModels,
                currentModel: action.payload,
                futureModels,
            };
        case actionType.DROP_END:
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
        type: actionType.DROP_END,
        payload
    }),
    dropEnd: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
        type: actionType.DROP_END,
        payload
    }),
    undo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.UN_DO, payload: {} }),
    redo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.RE_DO, payload: {} }),
    delete: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.DELETE, payload: {} }),
    forceUpdateModel: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
        type: actionType.FORCE_UPDATE_MODEL,
        payload
    })
};
export type ActionsType = typeof actions;