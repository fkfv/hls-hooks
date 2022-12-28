import usePlaybackState from "./use-playback-state";
import {useCallback, useDebugValue, useMemo} from "react";

const useIsPlaying = (): [
    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void
] => {
    const [playbackState, setPlaybackState] = usePlaybackState();
    const isPlaying = useMemo(() => playbackState === "playing" || playbackState === "loading", [playbackState]);

    useDebugValue(isPlaying);

    return [
        isPlaying,
        useCallback((playing: boolean) => {
            if (playing !== isPlaying) {
                setPlaybackState(playing ? "playing" : "paused");
            }
        }, [isPlaying, setPlaybackState])
    ];
};

export default useIsPlaying;
