import React, {useCallback, useEffect} from "react";
import {useHlsHooksContext} from "../context";
import Hls from "hls.js";
import {
    AUDIO_SELECT, AUDIO_SET, AVAILABLE_SET, DURATION_SET, PLAYBACK_REQUEST, PLAYBACK_SET,
    POSITION_REQUEST, POSITION_SET, QUALITY_SELECT, QUALITY_SET, STATE_REQUEST, STATE_SET, SUBTITLE_SELECT,
    SUBTITLE_SET, VOLUME_SET
} from "../actions";

const Video = ({
    children,
    ...props
}:  React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>) => {
    const {videoElementRef, hlsRef, dispatch, state} = useHlsHooksContext();

    if (!videoElementRef || !hlsRef || !dispatch || !state) {
        return null;
    }

    // State change requested.
    useEffect(() => {
        if (typeof state.state.requested !== "undefined" && state.state.current !== state.state.requested && videoElementRef.current !== null) {
            switch (state.state.requested) {
            case "paused":
                videoElementRef.current?.pause();
                break;
            case "playing":
                videoElementRef.current?.play();
                break;
            }

            dispatch({ type: STATE_REQUEST });
        }
    }, [state.state.requested]);

    // Volume change requested.
    useEffect(() => {
        if (typeof state.volume.current !== "undefined" && videoElementRef.current !== null) {
            videoElementRef.current.volume = state.volume.current;
        }
    }, [state.volume.current]);

    // Position change requested.
    useEffect(() => {
        if (typeof state.position !== "undefined" && typeof state.position.requested === "number" && videoElementRef.current !== null) {
            videoElementRef.current.fastSeek(state.position.requested);
            dispatch({ type: POSITION_REQUEST });
        }
    }, [state.position?.requested]);

    // Source change requested.
    useEffect(() => {
        if (typeof state.source !== "undefined" && hlsRef.current !== null) {
            hlsRef.current?.loadSource(state.source);
        }
    }, [state.source]);

    // Playback change requested.
    useEffect(() => {
        if (typeof state.playback.requested !== "undefined" && state.playback.rate !== state.playback.requested && videoElementRef.current !== null) {
            videoElementRef.current.playbackRate = state.playback.requested;
            dispatch({ type: PLAYBACK_REQUEST });
        }
    }, [state.playback.requested]);

    const availableQualitiesUpdatedHandler = useCallback(() => {
        dispatch({ type: QUALITY_SET, payload: hlsRef.current?.levels });
    }, [dispatch]);

    const qualityUpdatedHandler = useCallback(() => {
        dispatch({ type: QUALITY_SELECT, payload: hlsRef.current?.currentLevel });
    }, [dispatch]);

    const availableAudioTracksUpdatedHandler = useCallback(() => {
        dispatch({ type: AUDIO_SET, payload: hlsRef.current?.audioTracks});
    }, [dispatch]);

    const audioTrackUpdatedHandler = useCallback(() => {
        dispatch({ type: AUDIO_SELECT, payload: hlsRef.current?.audioTrack });
    }, [dispatch]);

    const availableSubtitleTracksUpdatedHandler = useCallback(() => {
        dispatch({ type: SUBTITLE_SET, payload: hlsRef.current?.subtitleTracks });
    }, [dispatch]);

    const subtitleTrackUpdatedHandler = useCallback(() => {
        dispatch({ type: SUBTITLE_SELECT, payload: hlsRef.current?.subtitleTrack });
    }, [dispatch]);

    // Player creation.
    useEffect(() => {
        if (videoElementRef.current !== null) {
            if (hlsRef.current !== null) {
                hlsRef.current?.detachMedia();
                hlsRef.current?.destroy();
            }

            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(videoElementRef.current);

            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, availableQualitiesUpdatedHandler);
            hlsRef.current.on(Hls.Events.LEVELS_UPDATED, availableQualitiesUpdatedHandler);
            hlsRef.current.on(Hls.Events.LEVEL_SWITCHED, qualityUpdatedHandler);

            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, availableAudioTracksUpdatedHandler);
            hlsRef.current.on(Hls.Events.AUDIO_TRACKS_UPDATED, availableAudioTracksUpdatedHandler);
            hlsRef.current.on(Hls.Events.AUDIO_TRACK_SWITCHED, audioTrackUpdatedHandler);

            hlsRef.current.on(Hls.Events.MANIFEST_PARSED, availableSubtitleTracksUpdatedHandler);
            hlsRef.current.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, availableSubtitleTracksUpdatedHandler);
            hlsRef.current.on(Hls.Events.SUBTITLE_TRACK_SWITCH, subtitleTrackUpdatedHandler);

            // Reload the source if one is available.
            if (typeof state.source !== "undefined") {
                hlsRef.current.loadSource(state.source);
            }

            return () => {
                if (hlsRef.current !== null) {
                    hlsRef.current.detachMedia();
                    hlsRef.current.destroy();
                }
            };
        }
    }, [availableQualitiesUpdatedHandler, qualityUpdatedHandler, availableAudioTracksUpdatedHandler, audioTrackUpdatedHandler, availableSubtitleTracksUpdatedHandler, subtitleTrackUpdatedHandler]);

    const convertRanges = (ranges?: TimeRanges): [number, number][] => {
        if (typeof ranges === 'undefined') return [];
        return [...Array(ranges.length).keys()].map(i => [ranges.start(i), ranges.end(i)]);
    };

    return (
        <>
            <video
                onCanPlay={() => {
                    dispatch({ type: STATE_SET, payload: "ready" });
                }}
                onPlaying={() => dispatch({ type: STATE_SET, payload: "playing" })}
                onPause={() => dispatch({ type: STATE_SET, payload: "paused" })}
                onWaiting={() => dispatch({ type: STATE_SET, payload: "loading" })}
                onLoadStart={() => dispatch({ type: STATE_SET, payload: "loading" })}

                onDurationChange={() => dispatch({ type: DURATION_SET, payload: videoElementRef.current?.duration })}
                onVolumeChange={() => dispatch({ type: VOLUME_SET, payload: videoElementRef.current?.volume })}
                onTimeUpdate={() => dispatch({ type: POSITION_SET, payload: videoElementRef.current?.currentTime })}
                onProgress={() => dispatch({ type: AVAILABLE_SET, payload: convertRanges(videoElementRef.current?.buffered) })}
                onRateChange={() => dispatch({ type: PLAYBACK_SET, payload: videoElementRef.current?.playbackRate })}

                ref={videoElementRef}
                {...props}
            >
                {children}
            </video>
        </>
    );
};

export default Video;