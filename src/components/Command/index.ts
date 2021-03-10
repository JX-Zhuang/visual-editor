// import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
// import CommandContext from './CommandContext';
// import { reducer, IState, actions } from '../../reducers/visualEditorModelValues';
// import { IVisualEditorModelValue } from '../../interfaces/visualEditor';
// import { test } from '../../config';

// export const initialState: IState = {
// 	previousModels: [],
// 	futureModels: [],
// 	currentModel: test
// };
// import React from 'react';
// import { IVisualEditorModelValue } from '../../interfaces/visualEditor';
// import { IState } from '../../reducers/visualEditorModelValues';

// export interface ICommandContext {
// 	undo(): any;
// 	redo(): any;
// 	deleteAction(): any;
// 	updateModel(model: IVisualEditorModelValue): any;
// 	forceUpdateModel(model: IVisualEditorModelValue): any;
// }
// const CommandContext = React.createContext({} as ICommandContext);
// export default CommandContext;

// let a: any;
// const CommandComponent: React.FC<any> = (props) => {
// 	const [ state, dispatch ] = useReducer(reducer, initialState);
// 	console.log('commandComponent blocks change', a === state.currentModel, a, state.currentModel);
// 	

// 	const contextValue = useMemo(
// 		() => {
// 			console.log('commandComponent blocks change', state.currentModel.blocks);
// 			const undo = () => actions.undo(dispatch);
// 			const redo = () => actions.redo(dispatch);
// 			const deleteAction = () => actions.deleteAction(dispatch);
// 			const forceUpdateModel = (model: IVisualEditorModelValue) => actions.forceUpdateModel(dispatch, model);
// 			const updateModel = (model: IVisualEditorModelValue) => actions.updateModel(dispatch, model);
// 			return {
// 				state,
// 				undo,
// 				redo,
// 				deleteAction,
// 				forceUpdateModel,
// 				updateModel
// 			};
// 		},
// 		[ dispatch, state ]
// 	);
// };
// export default CommandComponent;

export default {}