import useHlsState from "./use-hls-state";
import {useDebugValue} from "react";
import {MediaPlaylist} from "hls.js";

const useAudioTrack = (): [
    available: MediaPlaylist[],
    selected: number|undefined
] => {
    const [state,] = useHlsState();

    useDebugValue(state.audio.selected);

    return [
        state.audio.available,
        state.audio.selected
    ];
};

export default useAudioTrack;
