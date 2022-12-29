import useHlsState from "./use-hls-state";
import {useCallback, useDebugValue} from "react";
import {Level} from "hls.js";
import {QUALITY_REQUEST} from "../actions";

const useQuality = (): [
    qualities: Level[],
    quality: number|undefined,
    auto: boolean|undefined,
    setQuality: (quality: number) => void
] => {
    const [state, dispatch] = useHlsState();

    const setQuality = useCallback((quality: number) => {
        dispatch({ type: QUALITY_REQUEST, payload: quality });
    }, [dispatch]);

    useDebugValue(state.quality.selected);

    return [
        state.quality.available,
        state.quality.selected,
        state.quality.auto,
        setQuality
    ];
};

export default useQuality;
