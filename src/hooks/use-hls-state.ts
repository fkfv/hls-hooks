import {useHlsHooksContext} from "../context";
import {NOT_WITHIN_PROVIDER} from "../constants";
import {HlsHooksDispatch, HlsHooksState} from "../types";

const useHlsState = (): [
    state: HlsHooksState,
    dispatch: HlsHooksDispatch
] => {
    const {state, dispatch} = useHlsHooksContext();

    if (!state || !dispatch) {
        throw new Error(NOT_WITHIN_PROVIDER);
    }

    return [state, dispatch];
};

export default useHlsState;
