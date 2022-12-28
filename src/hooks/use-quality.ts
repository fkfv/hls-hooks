import useHlsState from "./use-hls-state";
import {useDebugValue} from "react";
import {Level} from "hls.js";

const useQuality = (): [
    qualities: Level[],
    quality: number|undefined
] => {
    const [state,] = useHlsState();

    useDebugValue(state.quality.selected);

    return [
        state.quality.available,
        state.quality.selected
    ];
};

export default useQuality;
