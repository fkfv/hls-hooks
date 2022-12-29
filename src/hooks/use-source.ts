import {useCallback, useDebugValue} from "react";
import useHlsState from "./use-hls-state";
import {SOURCE_SET} from "../actions";

const useSource = (): [
    source: string|undefined,
    setSource: (source: string|undefined) => void
] => {
    const [state, dispatch] = useHlsState();

    useDebugValue(state.source);

    const setSource = useCallback((source: string|undefined) => {
        dispatch({ type: SOURCE_SET, payload: source });
    }, [dispatch]);

    return [
        state.source,
        setSource
    ];
};

export default useSource;
