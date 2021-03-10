import React from 'react';
import { IVisualEditorBlockData, IVisualEditorModelValue } from '../interfaces/visualEditor';

export interface ICommandContext {
	undo(): any;
	redo(): any;
	deleteAction(): any;
	updateModel(model: IVisualEditorModelValue): any;
	forceUpdateModel(model: IVisualEditorModelValue): any;
	forceUpdateBlock(block: Partial<IVisualEditorBlockData>): any;
	clearAll(): any;
	copyBlock(id:string):any;
}
const CommandContext = React.createContext({} as ICommandContext);
export default CommandContext;
