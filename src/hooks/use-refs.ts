import useHlsInternals from "./use-hls-internals";
import {RefObject} from "react";
import Hls from "hls.js";

const useRefs = (): [
    videoElementRef?: RefObject<HTMLVideoElement>,
    hlsRef?: RefObject<Hls|null>
] => {
    const {hlsRef, videoElementRef} = useHlsInternals();

    return [videoElementRef, hlsRef];
};

export default useRefs;
