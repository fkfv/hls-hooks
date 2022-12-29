import {HlsHooksAction, HlsHooksState, HlsPlaybackStates} from "./types";
import {
    AUDIO_REQUEST, AUDIO_SELECT, AUDIO_SET, AVAILABLE_SET, DURATION_SET, PLAYBACK_REQUEST, PLAYBACK_SET,
    POSITION_REQUEST, POSITION_SET, QUALITY_REQUEST, QUALITY_SELECT, QUALITY_SET, SOURCE_SET, STATE_REQUEST, STATE_SET,
    SUBTITLE_REQUEST, SUBTITLE_SELECT, SUBTITLE_SET, VOLUME_PREVIOUS, VOLUME_SET
} from "./actions";
import {Level, MediaPlaylist} from "hls.js";

type QualitySelectPayload = {
    current: number|undefined;
    auto: boolean|undefined;
};

const reducer = (state: HlsHooksState, action: HlsHooksAction): HlsHooksState => {
    switch (action.type) {
    case STATE_SET:
        return {
            ...state,
            state: {
                ...state.state,
                current: action.payload as HlsPlaybackStates
            }
        };
    case STATE_REQUEST:
        return {
            ...state,
            state: {
                ...state.state,
                requested: action.payload as HlsPlaybackStates
            }
        };
    case DURATION_SET:
        return {
            ...state,
            duration: action.payload as number|undefined
        };
    case VOLUME_SET:
        return {
            ...state,
            volume: {
                ...state.volume,
                current: action.payload as number
            }
        };
    case VOLUME_PREVIOUS:
        return {
            ...state,
            volume: {
                ...state.volume,
                previousVolume: action.payload as number|undefined
            }
        };
    case POSITION_SET:
        return {
            ...state,
            position: {
                ...state.position,
                current: action.payload as number|undefined
            }
        };
    case POSITION_REQUEST:
        return {
            ...state,
            position: {
                ...state.position,
                requested: action.payload as number|undefined
            }
        };
    case AVAILABLE_SET:
        return {
            ...state,
            available: action.payload as [number, number][]
        };
    case SOURCE_SET:
        return {
            ...state,
            source: action.payload as string|undefined
        };
    case QUALITY_SET:
        return {
            ...state,
            quality: {
                ...state.quality,
                available: action.payload as Level[]
            }
        };
    case QUALITY_SELECT:
        return {
            ...state,
            quality: {
                ...state.quality,
                selected: (action.payload as QualitySelectPayload).current,
                auto: (action.payload as QualitySelectPayload).auto
            }
        };
    case QUALITY_REQUEST:
        return {
            ...state,
            quality: {
                ...state.quality,
                requested: action.payload as number|undefined
            }
        };
    case AUDIO_SET:
        return {
            ...state,
            audio: {
                ...state.audio,
                available: action.payload as MediaPlaylist[]
            }
        };
    case AUDIO_SELECT:
        return {
            ...state,
            audio: {
                ...state.audio,
                selected: action.payload as number|undefined
            }
        };
    case AUDIO_REQUEST:
        return {
            ...state,
            audio: {
                ...state.audio,
                requested: action.payload as number|undefined
            }
        };
    case SUBTITLE_SET:
        return {
            ...state,
            subtitle: {
                ...state.subtitle,
                available: action.payload as MediaPlaylist[]
            }
        };
    case SUBTITLE_SELECT:
        return {
            ...state,
            subtitle: {
                ...state.subtitle,
                selected: action.payload as number|undefined
            }
        };
    case SUBTITLE_REQUEST:
        return {
            ...state,
            subtitle: {
                ...state.subtitle,
                requested: action.payload as number|undefined
            }
        };
    case PLAYBACK_SET:
        return {
            ...state,
            playback: {
                ...state.playback,
                rate: action.payload as number|undefined
            }
        };
    case PLAYBACK_REQUEST:
        return {
            ...state,
            playback: {
                ...state.playback,
                requested: action.payload as number|undefined
            }
        };
    }

    return state;
};

export default reducer;
