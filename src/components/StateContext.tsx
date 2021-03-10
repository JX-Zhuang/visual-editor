import React from 'react';
import { IState } from '../reducers/visualEditorModelValues';

export interface IStateContext {
	state: IState;
}
const StateContext = React.createContext({} as IStateContext);
export default StateContext;
