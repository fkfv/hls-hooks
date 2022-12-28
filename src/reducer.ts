import {HlsHooksAction, HlsHooksState} from "./types";
import {
    AUDIO_SELECT, AUDIO_SET, AVAILABLE_SET, DURATION_SET, PLAYBACK_REQUEST, PLAYBACK_SET,
    POSITION_REQUEST, POSITION_SET, QUALITY_SELECT, QUALITY_SET, SOURCE_SET,
    STATE_REQUEST, STATE_SET, SUBTITLE_SELECT, SUBTITLE_SET, VOLUME_PREVIOUS, VOLUME_SET
} from "./actions";

const reducer = (state: HlsHooksState, action: HlsHooksAction): HlsHooksState => {
    switch (action.type) {
    case STATE_SET:
        return {
            ...state,
            state: {
                ...state.state,
                current: action.payload
            }
        };
    case STATE_REQUEST:
        return {
            ...state,
            state: {
                ...state.state,
                requested: action.payload
            }
        };
    case DURATION_SET:
        return {
            ...state,
            duration: action.payload
        };
    case VOLUME_SET:
        return {
            ...state,
            volume: {
                ...state.volume,
                current: action.payload
            }
        };
    case VOLUME_PREVIOUS:
        return {
            ...state,
            volume: {
                ...state.volume,
                previousVolume: action.payload
            }
        };
    case POSITION_SET:
        return {
            ...state,
            position: {
                ...state.position,
                current: action.payload
            }
        };
    case POSITION_REQUEST:
        return {
            ...state,
            position: {
                ...state.position,
                requested: action.payload
            }
        };
    case AVAILABLE_SET:
        return {
            ...state,
            available: action.payload
        };
    case SOURCE_SET:
        return {
            ...state,
            source: action.payload
        };
    case QUALITY_SET:
        return {
            ...state,
            quality: {
                ...state.quality,
                available: action.payload
            }
        };
    case QUALITY_SELECT:
        return {
            ...state,
            quality: {
                ...state.quality,
                selected: action.payload
            }
        };
    case AUDIO_SET:
        return {
            ...state,
            audio: {
                ...state.audio,
                available: action.payload
            }
        };
    case AUDIO_SELECT:
        return {
            ...state,
            audio: {
                ...state.audio,
                selected: action.payload
            }
        };
    case SUBTITLE_SET:
        return {
            ...state,
            subtitle: {
                ...state.subtitle,
                available: action.payload
            }
        };
    case SUBTITLE_SELECT:
        return {
            ...state,
            subtitle: {
                ...state.subtitle,
                selected: action.payload
            }
        };
    case PLAYBACK_SET:
        return {
            ...state,
            playback: {
                ...state.playback,
                rate: action.payload
            }
        };
    case PLAYBACK_REQUEST:
        return {
            ...state,
            playback: {
                ...state.playback,
                requested: action.payload
            }
        };
    }

    return state;
};

export default reducer;
