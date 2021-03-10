class Undo<T>{
    private past: T[] = [];
    private future: T[] = [];
    private present: T = {} as T;
    constructor(newPresent:T) {
        this.present = newPresent;
    }
    update(newPresent: T) {
        if (this.present !== newPresent) {
            this.present = newPresent;
        }
        return this.getData();
    }
    add(newPresent: T) {
        if (this.present !== newPresent) {
            this.future = [];
            this.past = this.past.concat(this.present);
            this.present = newPresent;
        }
        return this.getData();
    }
    undo() {
        if (this.past.length > 0) {
            const past = this.past[this.past.length - 1];
            this.past = this.past.slice(0, this.past.length - 1);
            this.future = [this.present, ...this.future];
            this.present = past;
        }
        return this.getData();
    }
    redo() {
        if (this.future.length > 0) {
            const next = this.future[0];
            this.past = this.past.concat(this.present);
            this.present = next;
            this.future = this.future.slice(1);
        }
        return this.getData();
    }
    getData() {
        return {
            past: this.past,
            present: this.present,
            future: this.future
        }
    }
    getStatus(): { undoAble: boolean; redoAble: boolean } {
        return {
            undoAble: this.past.length > 0,
            redoAble: this.future.length > 0
        }
    }
}
export default Undo;


// import React from "react";
// import Undo from '../utils/Undo';
// import deepcopy from 'deepcopy';
// import { test } from '../config';
// import { IVisualEditorModelValue } from "../interfaces/visualEditor";
// export enum actionType {
//     RE_DO = 'REDO',
//     UN_DO = 'UN_DO',    //撤销
//     UPDATE_MODEL = 'UPDATE_MODEL',
//     DELETE = 'DELETE',
//     FORCE_UPDATE_MODEL = 'FORCE_UPDATE_MODEL',   //强制更新当前的model，不能撤销
//     MOVEING = 'MOVEING'
// };
// export interface IState {
//     previousModels: IVisualEditorModelValue[];
//     futureModels: IVisualEditorModelValue[];
//     currentModel: IVisualEditorModelValue;
// };
// export interface IAction {
//     type: actionType;
//     payload: any;
// }
// const undo = new Undo<IVisualEditorModelValue>(test);
// export const reducer: React.Reducer<IState, IAction> = (state, action) => {
//     const { currentModel } = state;
//     console.log(action.type)
//     switch (action.type) {
//         case actionType.DELETE: {
//             if (currentModel.blocks.length <= 0) return state;
//             const newCurrentModel: IVisualEditorModelValue = {
//                 container: currentModel.container,
//                 blocks: currentModel.blocks.filter((block) => !block.focus)
//             };
//             const data = undo.add(newCurrentModel);
//             return {
//                 previousModels: data.past,
//                 currentModel: data.present,
//                 futureModels: data.future
//             };
//         }
//         case actionType.FORCE_UPDATE_MODEL: {
//             const data = undo.update(action.payload);
//             return deepcopy({
//                 previousModels: data.past,
//                 currentModel: data.present,
//                 futureModels: data.future
//             });
//         }
//         case actionType.UPDATE_MODEL: {
//             // todo 能不能不用deepcopy
//             const data = undo.add(deepcopy(action.payload));
//             console.log('actionType updateModel', data.present === state.currentModel);
//             return {
//                 previousModels: data.past,
//                 currentModel: data.present,
//                 futureModels: data.future
//             };
//         }
//         case actionType.UN_DO: {
//             if (!undo.getStatus().undoAble) return state;
//             const data = undo.undo();
//             console.log('actionType undo', data.present === state.currentModel);
//             return deepcopy({
//                 previousModels: data.past,
//                 currentModel: data.present,
//                 futureModels: data.future
//             })
//         }
//         case actionType.RE_DO: {
//             if (!undo.getStatus().redoAble) return state;
//             const data = undo.redo();
//             return {
//                 previousModels: data.past,
//                 currentModel: data.present,
//                 futureModels: data.future
//             }
//         }
//         default:
//             throw new Error("Unexpected action");
//     }
// };
// export const actions = {
//     updateModel: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
//         type: actionType.UPDATE_MODEL,
//         payload
//     }),
//     undo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.UN_DO, payload: {} }),
//     redo: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.RE_DO, payload: {} }),
//     deleteAction: (dispatch: React.Dispatch<IAction>) => dispatch({ type: actionType.DELETE, payload: {} }),
//     forceUpdateModel: (dispatch: React.Dispatch<IAction>, payload: IVisualEditorModelValue) => dispatch({
//         type: actionType.FORCE_UPDATE_MODEL,
//         payload
//     })
// };
// export type ActionsType = typeof actions;
