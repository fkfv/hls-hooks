# hls-hooks
> React hooks for playing video using [HLS.js](https://github.com/video-dev/hls.js/).
## Example

```tsx
// MyVideoPlayer.tsx
import React, {useState} from "react";
import {Video, useIsPlaying, useDuration, usePosition} from "hls-hooks";

const MyVideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useIsPlaying();
    const [duration] = useDuration();
    const [position, setPosition] = usePosition();
    const [newPosition, setNewPosition] = useState(0);

    return (<div>
            <Video/>
            <button
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>

            <input
                onChange={(e) => setNewPosition(e.currentTarget.valueAsNumber)}
                value={newPosition}
                type={"number"}
            />
            <button onClick={() => setPosition(newPosition)}>Set Position</button>
            <p>{position} / {duration}</p>
        </div>);
};

export default MyVideoPlayer;
```
```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {HlsHookProvider} from "hls-hooks";
import MyVideoPlayer from "./MyVideoPlayer";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HlsHookProvider>
            <MyVideoPlayer/>
        </HlsHookProvider>
    </React.StrictMode>
);
```

See [API.md](docs/API.md) for further explanation and API reference.
## License
Licensed under the MIT license.
