import {HlsPlaybackStates} from "../types";
import {STATE_REQUEST} from "../actions";
import {useCallback, useDebugValue} from "react";
import useHlsState from "./use-hls-state";

const usePlaybackState = (): [
    playbackState: HlsPlaybackStates,
    setPlaybackState: (playbackState: HlsPlaybackStates) => void
] => {
    const [state, dispatch] = useHlsState();
    const setPlaybackState = useCallback((state: HlsPlaybackStates) => dispatch({ type: STATE_REQUEST, payload: state }), [dispatch]);

    useDebugValue(state.state.current);
    return [
        state.state.current,
        setPlaybackState
    ];
};

export default usePlaybackState;
