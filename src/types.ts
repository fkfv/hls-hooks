import {Dispatch, MutableRefObject, Reducer, RefObject} from "react";
import Hls, {Level, MediaPlaylist} from "hls.js";

export type HlsPlaybackStates = "none" | "loading" | "ready" | "playing" | "paused" | "error";

export type HlsHooksAction<T = unknown> = {
    type: string;
    payload?: T;
};

export type HlsHooksState = {
    state: {
        // The current state of the player.
        current: HlsPlaybackStates;

        // The state that is being requested for the player.
        requested?: HlsPlaybackStates;
    };

    // The duration of the video, in seconds.
    duration?: number;

    volume: {
        // The current volume, as a percentage.
        current: number;

        // The volume before the player was muted.
        previousVolume?: number;
    };

    position: {
        // The current position in seconds.
        current?: number;

        // The position that the player should jump to when possible.
        requested?: number;
    };

    // A list of ranges of the video that is available.
    available: [number, number][];

    // The media source.
    source?: string;

    quality: {
        // Available quality levels.
        available: Level[];

        // Currently selected level.
        selected?: number;

        // Requested level.
        requested?: number;

        // If the level was selected automatically.
        auto?: boolean;
    };

    audio: {
        // Available audio tracks.
        available: MediaPlaylist[];

        // Currently selected track.
        selected?: number;
    };

    subtitle: {
        // Available subtitle tracks.
        available: MediaPlaylist[];

        // Selected subtitle track.
        selected?: number;
    };

    playback: {
        // Current playback rate.
        rate?: number;

        // Requested playback rate.
        requested?: number;
    }
};

export type HlsHooksDispatch = Dispatch<HlsHooksAction>;
export type HlsHooksReducer = Reducer<HlsHooksState, HlsHooksAction>;

export type HlsHooksEvent = (source: "component" | "external") => void;
export type HlsHooksEventWithArg<T> = (arg: T, source: "component" | "external") => void;

export type HlsHooksEvents = {
    // Raised when the source of the video changes.
    onSourceChange?: HlsHooksEvent;

    // Raised when the volume of the video changes.
    onVolumeChange?: HlsHooksEvent;

    // Raised when the available qualities of the video changes.
    onQualitiesChange?: HlsHooksEvent;

    // Raised when the selected quality is changed.
    onQualityChange?: HlsHooksEvent;

    // Raised when the available audio tracks change.
    onAudioTracksChange?: HlsHooksEvent;

    // Raised when the selected audio track changes.
    onAudioTrackChange?: HlsHooksEvent;

    // Raised when the available subtitle tracks change.
    onSubtitleTracksChange?: HlsHooksEvent;

    // Raised when the selected subtitle track changes.
    onSubtitleTrackChange?: HlsHooksEvent;

    // Raised when the current position in the video is changed.
    onPositionChange?: HlsHooksEvent;

    // Raised when the length of the video is changed.
    onDurationChange?: HlsHooksEvent;

    // Raised when the amount of video that is buffered changes.
    onAvailableChange?: HlsHooksEvent;

    // Raised when the playback speed changes.
    onPlaybackChange?: HlsHooksEvent;

    // Raised when the playback state of the video changes.
    onStateChange?: HlsHooksEvent;
};

export type HlsHooksContext = {
    // Reference to the <video> element if it is available.
    videoElementRef?: RefObject<HTMLVideoElement>;

    // Reference to the current Hls.js context if one is available.
    hlsRef?: MutableRefObject<Hls|null>;

    // The state of the application.
    state?: HlsHooksState;

    // The dispatcher for updating the state.
    dispatch?: HlsHooksDispatch;

    // Events.
    events?: HlsHooksEvents;
};
