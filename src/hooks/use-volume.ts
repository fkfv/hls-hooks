import useHlsState from "./use-hls-state";
import {useCallback, useDebugValue, useMemo} from "react";
import {VOLUME_PREVIOUS, VOLUME_SET} from "../actions";

const useVolume = (): [
    volume: number,
    muted: boolean,
    setVolume: (volume: number) => void,
    setMuted: (muted: boolean) => void
] => {
    const [state, dispatch] = useHlsState();

    const muted = useMemo(() => state.volume.current === 0, [state.volume.current]);
    const setVolume = useCallback((volume: number) => dispatch({ type: VOLUME_SET, payload: volume }), [dispatch]);
    const setMuted = useCallback((mute: boolean) => {
        if (mute !== muted) {
            if (mute) {
                dispatch({ type: VOLUME_PREVIOUS, payload: state.volume.current });
            }

            dispatch({ type: VOLUME_SET, payload: mute ? 0 : state.volume.previousVolume ?? 1 });
        }
    }, [dispatch, state.volume.current, state.volume.previousVolume, muted]);

    useDebugValue(state.volume.current);

    return [
        state.volume.current,
        muted,
        setVolume,
        setMuted
    ];
};

export default useVolume;
