import useHlsState from "./use-hls-state";
import {useCallback, useDebugValue} from "react";
import {MediaPlaylist} from "hls.js";
import {SUBTITLE_REQUEST} from "../actions";

const useSubtitleTrack = (): [
    available: MediaPlaylist[],
    selected: number|undefined,
    setTrack: (track: number|undefined) => void
] => {
    const [state, dispatch] = useHlsState();

    useDebugValue(state.subtitle.selected);

    const setTrack = useCallback((track: number|undefined) => {
        dispatch({ type: SUBTITLE_REQUEST, payload: track });
    }, [dispatch]);

    return [
        state.subtitle.available,
        state.subtitle.selected,
        setTrack
    ];
};

export default useSubtitleTrack;
