import useHlsState from "./use-hls-state";
import {useDebugValue} from "react";

const useAvailable = (): [number, number][] => {
    const [state,] = useHlsState();
    useDebugValue(state.available);
    return state.available;
};

export default useAvailable;
