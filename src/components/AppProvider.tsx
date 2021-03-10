import React, { useReducer, useMemo, useEffect } from 'react';
import { reducer, actions } from '../reducers/visualEditorModelValues';
import { IVisualEditorBlockData, IVisualEditorModelValue } from '../interfaces/visualEditor';
import { test } from '../config';
import CommandContext from './CommandContext';
import StateContext from './StateContext';
import keyboardCode from '../utils/keyCode';
export const initialState = {
	previousModels: [],
	futureModels: [],
	currentModel: test
};
interface IKeyboardAction {
	name: string;
	keyboard: string | string[];
	action: (...agrus: any) => any;
}
const registerActionInit = () => {
	const actions: IKeyboardAction[] = [];
	return {
		actions,
		register(action: IKeyboardAction) {
			actions.push(action);
		}
	};
};
const AppProvider: React.FC<any> = (props) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const contextValue = useMemo(
		() => {
			const undo = () => actions.undo(dispatch);
			const redo = () => actions.redo(dispatch);
			const deleteAction = () => actions.deleteAction(dispatch);
			const forceUpdateModel = (model: IVisualEditorModelValue) => actions.forceUpdateModel(dispatch, model);
			const updateModel = (model: IVisualEditorModelValue) => actions.updateModel(dispatch, model);
			const forceUpdateBlock = (block: Partial<IVisualEditorBlockData>) =>
				actions.forceUpdateBlock(dispatch, block);
			return {
				undo,
				redo,
				deleteAction,
				forceUpdateModel,
				updateModel,
				forceUpdateBlock,
				clearAll: () => actions.clearAll(dispatch),
				copyBlock:(id:string)=>actions.copyBlock(dispatch,id)
			};
		},
		[ dispatch ]
	);
	const keyboardActions = useMemo(
		() => {
			const { actions, register } = registerActionInit();
			register({
				name: 'undo',
				keyboard: 'ctrl+z',
				action: contextValue.undo
			});
			register({
				name: 'redo',
				keyboard: [ 'ctrl+shift+z', 'ctrl+y' ],
				action: contextValue.redo
			});
			register({
				name: 'delete',
				keyboard: [ 'ctrl+d', 'backspace', 'delete' ],
				action: contextValue.deleteAction
			});
			return actions;
		},
		[ contextValue ]
	);
	useEffect(
		() => {
			const onKeyDown = (e: KeyboardEvent) => {
				if (document.activeElement !== document.body) {
					return;
				}
				const { keyCode, shiftKey, altKey, ctrlKey, metaKey } = e;
				let keyString: string[] = [];
				if (ctrlKey || metaKey) keyString.push('ctrl');
				if (shiftKey) keyString.push('shift');
				if (altKey) keyString.push('alt');
				keyString.push(keyboardCode[keyCode]);
				const keyNames = keyString.join('+');
				const keyboardAction = keyboardActions.find((action) => {
					const keys = Array.isArray(action.keyboard) ? action.keyboard : [ action.keyboard ];
					return keys.includes(keyNames);
				});
				if (keyboardAction) {
					e.stopPropagation();
					e.preventDefault();
					keyboardAction.action();
				}
			};
			window.addEventListener('keydown', onKeyDown);
			return () => {
				window.removeEventListener('keydown', onKeyDown);
			};
		},
		[ keyboardActions ]
	);
	return (
		<StateContext.Provider value={{ state }}>
			<CommandContext.Provider value={contextValue}>{props.children}</CommandContext.Provider>
		</StateContext.Provider>
	);
};
export default AppProvider;
