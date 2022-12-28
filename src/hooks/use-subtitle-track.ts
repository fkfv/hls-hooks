import useHlsState from "./use-hls-state";
import {useDebugValue} from "react";
import {MediaPlaylist} from "hls.js";

const useSubtitleTrack = (): [
    available: MediaPlaylist[],
    selected: number|undefined
] => {
    const [state,] = useHlsState();

    useDebugValue(state.subtitle.selected);

    return [
        state.subtitle.available,
        state.subtitle.selected
    ];
};

export default useSubtitleTrack;
