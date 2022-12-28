import useHlsState from "./use-hls-state";
import {useCallback, useDebugValue} from "react";
import {POSITION_REQUEST} from "../actions";

const usePosition = (): [
    position: number|undefined,
    setPosition: (position: number) => void
] => {
    const [state, dispatch] = useHlsState();

    const setPosition = useCallback((position: number) => {
        dispatch({ type: POSITION_REQUEST, payload:  position });
    }, [dispatch]);

    useDebugValue(state.position.current);

    return [
        state.position.current,
        setPosition
    ];
};

export default usePosition;
