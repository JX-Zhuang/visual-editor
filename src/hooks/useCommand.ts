import { useContext } from 'react';
import CommandContext from '../components/CommandContext';
const useCommand = () => {
	return useContext(CommandContext);
};
export default useCommand;