# hls-hooks API v0

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Provider](#provider)
  - [Video](#video)
  - [Hooks](#hooks)
- [Versioning](#versioning)
- [Reference](#reference)
  - [Provider](#provider-1)
    - [Properties](#properties)
      - [volume](#volume--number--undefined)
      - [position](#position--number--undefined)
      - [source](#source--string--undefined)
      - [playbackRate](#playbackrate--number--undefined)
      - [Events](#events)
  - [Video](#video-1)
    - [Properties](#properties-)
  - [Hooks](#hooks-1)
    - [useAudioTrack()](#useaudiotrack--)
    - [useAvailable()](#useavailable--)
    - [useDuration()](#useduration--)
    - [useIsPlaying()](#useisplaying--)
    - [usePlaybackState()](#useplaybackstate--)
    - [usePosition()](#useposition--)
    - [useQuality()](#usequality--)
    - [useSubtitleTrack()](#usesubtitletrack--)
    - [useVolume()](#usevolume--)
  - [Events](#events-1)
    - [onSourceChange](#onsourcechange--function---)
    - [onVolumeChange](#onvolumechange--function---)
    - [onQualitiesChange](#onqualitieschange--function---)
    - [onQualityChange](#onqualitychange--function---)
    - [onAudioTracksChange](#onaudiotrackschange--function---)
    - [onAudioTrackChange](#onaudiotrackchange--function---)
    - [onSubtitleTracksChange](#onsubtitletrackschange--function---)
    - [onSubtitleTrackChange](#onsubtitletrackchange--function---)
    - [onPositionChange](#onpositionchange--function---)
    - [onDurationChange](#ondurationchange--function---)
    - [onAvailableChange](#onavailablechange--function---)
    - [onPlaybackChange](#onplaybackchange--function---)
    - [onStateChange](#onstatechange--function---)

## Getting Started
### Installation
Install the package using your preferred package manager.

`npm install --save hls-hooks`

`yarn add hls-hooks`
### Provider
The provider is responsible for creating the state used by the player. All hooks used must be in the child components of the provider. You can specify some default values to the provider. You could add the provider to the root render call as an example.
```tsx
import {HlsHooksProvider} from "hls-hooks";

// ...

root.render(
    <React.StrictMode>
        <HlsHooksProvider
            source="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        >
            <App />
        </HlsHooksProvider>
    </React.StrictMode>
);
```
### Video
The video element is responsible for rendering the player. It accepts the same attributes as the html `<video>` element (it is really just a wrapper around the `<video>` tag that adds the required events).

```tsx
import React from "react";
import {Video} from "hls-hooks";

const App = () => {
    return (
        <div>
            <Video />
        </div>
    );
};

export default App;
```
### Hooks
Hooks provide the main functionality to build your player. Let's extend the previous component to include a play/pause button.
```tsx
import React from "react";
import {Video, useIsPlaying} from "hls-hooks";

const App = () => {
    const [isPlaying, setIsPlaying] = useIsPlaying();
    
    return (
        <div>
            <Video />
            <button
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default App;
```

## Versioning
The library follows semantic versioning. Breaking changes will see a major version bump, new features will be a minor version bump and fixes will be patch versions.

## Reference
### Provider
```tsx
import {HlsHooksProvider} from "hls-hooks";

return (
    <HlsHooksProvider
        volume={0.5}
        position={35}
        source="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        playbackRate={1.0}
    >
        ...
    </HlsHooksProvider>
);
```

Creates a new context for a video player. To display the video player you should include a [`<Video />`](#video-1) child element.

#### Properties:

##### volume: number | undefined
Default value: 1.0

A number between 0 and 1 to use as the initial volume of the player.

##### position: number | undefined
Default value: undefined

Position to start at in the video, in seconds. Ignored if the default source is not also defined.

##### source: string | undefined
Default value: undefined

Video to load on initialisation.

##### playbackRate: number | undefined
Default value: 1.0

The default speed to play the video at.

#### Events
See [Events](#events-1).

### Video
```tsx
import {Video} from "hls-hooks";

return (
    <Video />
);
```
Renders the video from a [`<HlsHooksProvider>`](#provider-1).

#### Properties
See [`<video>` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-controls).

### Hooks
#### useAudioTrack()
```ts
import {useAudioTrack, MediaPlaylist} from "hls-hooks";

const useAudioTrack: () => [
    available: MediaPlaylist[],
    selected: number | undefined
];
```
Get the available audio tracks, and any currently selected track.

#### useAvailable()
```ts
import {useAvailable} from "hls-hooks";

const useAvailable: () => [number, number][];
```
Get a list of ranges that have been buffered.

*NOTE:* The first item in the list may not start with exactly zero, even if the video has been played from the start.

#### useDuration()
```ts
import {useDuration} from "hls-hooks";

const useDuration: () => number|undefined;
```
Get the duration of the video.

#### useIsPlaying()
```ts
import {useIsPlaying} from "hls-hooks";

const useIsPlaying: () => [
    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void
];
```
Get or set if the video is currently playing (or paused).
#### usePlaybackState()
```ts
import {usePlaybackState} from "hls-hooks";

const usePlaybackState: () => [
    playbackState: HlsPlaybackStates,
    setPlaybackState: (playbackState: HlsPlaybackStates) => void
];
```
Get or set the current playback state.

Possible states:
* `none`  - the video player is newly created
* `loading` - the video is buffering
* `ready` - the video has loaded enough to begin playback
* `playing` - the video is playing
* `paused` - the video is paused
* `error` - the player has had an unrecoverable error

#### usePosition()
```ts
import {usePosition} from "hls-hooks";

const usePosition: () => [
    position: number|undefined,
    setPosition: (position: number) => void
];
```
Get or set the current position in the video, in seconds.

#### useQuality()
```ts
import {useQuality} from "hls-hooks";

const useQuality: () => [
    qualities: Level[],
    quality: number|undefined
];
```
Get the available qualities, and any currently selected quality.

#### useSubtitleTrack()
```ts
import {useSubtitleTrack, MediaPlaylist} from "hls-hooks";

const useSubtitleTrack: () => [
    available: MediaPlaylist[],
    selected: number | undefined
];
```
Get the available subtitle tracks, and any currently selected track.

#### useVolume()
```ts
import {useVolume} from "hls-hooks";

const useVolume: () => [
    volume: number,
    muted: boolean,
    setVolume: (volume: number) => void,
    setMuted: (muted: boolean) => void
];
```
Get or set the volume and muted status.

*NOTE*: Muting instead of setting the volume to zero will restore the previous volume level on unmute.

### Events
#### onSourceChange: function () {}
Event raised when the source of the video is changed.

#### onVolumeChange: function () {}
Event raised when the volume is changed.

#### onQualitiesChange: function () {}
Event raised when the available qualities are changed.

#### onQualityChange: function () {}
Event raised when the selected quality is changed.

#### onAudioTracksChange: function () {}
Event raised when the available audio tracks change.

#### onAudioTrackChange: function () {}
Event raised when the selected audio track changes.

#### onSubtitleTracksChange: function () {}
Event raised when the available subtitle tracks change.

#### onSubtitleTrackChange: function () {}
Event raised when the selected subtitle track changes.

#### onPositionChange: function () {}
Event raised when the current position in the video is changed.

#### onDurationChange: function () {}
Event raised when the length of the video is changed.

#### onAvailableChange: function () {}
Event raised when the amount of video that is buffered changes.

#### onPlaybackChange: function () {}
Event raised when the playback speed changes.

#### onStateChange: function () {}
Event raised when the playback state of the video changes.