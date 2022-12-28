import useHlsState from "./use-hls-state";
import {useDebugValue} from "react";

const useDuration = (): number|undefined => {
    const [state,] = useHlsState();
    useDebugValue(state.duration);
    return state.duration;
};

export default useDuration;
