import React, {PropsWithChildren, useReducer, useRef} from "react";
import {HlsHooksContext, HlsHooksEvents, HlsHooksState} from "../types";
import {HlsHooksProvider as HlsHooksContextProvider} from "../context";
import reducer from "../reducer";
import Hls from "hls.js";

export type DefaultProps = {
    // Default volume to use for the video.
    // Default value: 1.0
    volume?: number;

    // Jump to a position once the player is loaded.
    // Default value: none
    position?: number;

    // Default source to use for the video.
    // Default value: none.
    source?: string;

    // Default playback rate.
    // Default value: 1.0
    playbackRate?: number;
};

export type HlsHooksProviderProps = HlsHooksEvents & DefaultProps;

const defaultState: HlsHooksState = {
    state: {
        current: "none",
        requested: undefined
    },
    duration: undefined,
    volume: {
        current: 1,
        previousVolume: undefined
    },
    position: {
        current: undefined,
        requested: undefined
    },
    available: [],
    source: undefined,
    quality: {
        available: [],
        selected: undefined
    },
    audio: {
        available: [],
        selected: undefined
    },
    subtitle: {
        available: [],
        selected: undefined
    },
    playback: {
        rate: 1.0,
        requested: undefined
    }
};

const createDefaultState = (userState: DefaultProps) => {
    if (typeof userState.volume === "undefined") {
        userState.volume = defaultState.volume.current;
    }

    if (typeof userState.playbackRate === "undefined") {
        userState.playbackRate = defaultState.playback.rate;
    }

    return Object.assign({}, defaultState, {
        volume: {
            ...defaultState.volume,
            current: userState.volume
        },
        position: {
            ...defaultState.position,
            current: userState.position
        },
        source: userState.source,
        playback: {
            ...defaultState.playback,
            rate: userState.playbackRate
        }
    });
};

const HlsHooksProvider = ({
    volume,
    position,
    source,
    playbackRate,

    onSourceChange,
    onVolumeChange,
    onQualitiesChange,
    onQualityChange,
    onAudioTracksChange,
    onAudioTrackChange,
    onSubtitleTracksChange,
    onSubtitleTrackChange,
    onPositionChange,
    onDurationChange,
    onAvailableChange,
    onPlaybackChange,
    onStateChange,
    children
}: PropsWithChildren<HlsHooksProviderProps>) => {
    const videoElementRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls|null>(null);
    const [state, dispatch] = useReducer(reducer, createDefaultState({
        volume, position, source, playbackRate
    }));

    const context: HlsHooksContext = {
        videoElementRef,
        hlsRef,
        state,
        dispatch,
        events: {
            onSourceChange,
            onVolumeChange,
            onQualitiesChange,
            onQualityChange,
            onAudioTracksChange,
            onAudioTrackChange,
            onSubtitleTracksChange,
            onSubtitleTrackChange,
            onPositionChange,
            onDurationChange,
            onAvailableChange,
            onPlaybackChange,
            onStateChange
        }
    };

    return (
        <HlsHooksContextProvider value={context}>
            {children}
        </HlsHooksContextProvider>
    );
};

export default HlsHooksProvider;
