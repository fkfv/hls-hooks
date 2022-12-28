import {createContext, useContext} from "react";
import {HlsHooksContext} from "./types";

export const hlsHooksContext = createContext<HlsHooksContext>({});
export const HlsHooksProvider = hlsHooksContext.Provider;
export const useHlsHooksContext = () => useContext(hlsHooksContext);
