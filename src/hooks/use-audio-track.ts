import useHlsState from "./use-hls-state";
import {useCallback, useDebugValue} from "react";
import {MediaPlaylist} from "hls.js";
import {AUDIO_REQUEST} from "../actions";

const useAudioTrack = (): [
    available: MediaPlaylist[],
    selected: number|undefined,
    setTrack: (track: number|undefined) => void
] => {
    const [state, dispatch] = useHlsState();

    useDebugValue(state.audio.selected);

    const setTrack = useCallback((track: number|undefined) => {
        dispatch({ type: AUDIO_REQUEST, payload: track });
    }, [dispatch]);

    return [
        state.audio.available,
        state.audio.selected,
        setTrack
    ];
};

export default useAudioTrack;
