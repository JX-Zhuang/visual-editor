import { useContext, useMemo } from 'react';
import StateContext from '../components/StateContext';
const useVisualModelData = () => {
    const ctx = useContext(StateContext);
    return useMemo(() => ctx.state, [ctx.state]);
};
export default useVisualModelData;