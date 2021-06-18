<h1 align="center">raptor-howler</h1>
<p align="center"><img src="https://raw.githubusercontent.com/amirHossein-Ebrahimi/raptor-howler/master/doc/assets/logo.svg" alt="raptor howler logo" width="200"></p>
<p align="center">Minimal React wrapper for howlerjs</p>
<p align="center">
  <a href="https://github.com/amirHossein-Ebrahimi/raptor-howler/blob/master/license">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license" />
  </a>
  <a href="https://npmjs.org/package/raptor-howler">
    <img src="https://img.shields.io/npm/dt/raptor-howler.svg" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/result?p=raptor-howler">
    <img src="https://img.shields.io/bundlephobia/minzip/raptor-howler.svg" alt="downloads" />
</a>
</p>

---
[howler.js](https://github.com/goldfire/howler.js/) + [react-aptor](https://github.com/amirHossein-Ebrahimi/react-aptor) + ❤ = raptor-howler️

Minimal React wrapper for howler.js using react-aptor

## Why to use raptor-howler
- read **[#why](https://github.com/amirHossein-Ebrahimi/react-aptor#why)** section of react-aptor


## Usage
`npm install --save raptor-howler`  
or with yard  
`yarn add raptor-howler`  

```js
import RaptorHowler from 'raptor-howler'

const App = () => (
  <RaptorHowler
    src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
    playing={true}
  />
);
```

You can find a complete example for basic functionality of **raptor-howler** using create-react-app, [here](https://github.com/amirHossein-Ebrahimi/raptor-howler/tree/master/example)


## Props
props are passed directly to `new Howl` with default value

for more info about props types see [howler.js core section](https://github.com/goldfire/howler.js/#core)  
```javascript
new Howl({
  src: props.src,
  xhr: props.xhr || {},
  format: props.format || [],
  mute: props.mute || false,
  loop: props.loop || false,
  preload: props.preload || false,
  rate: props.rate || 1.0,
  volume: props.volume || 1.0,
  onend: props.onEnd,
  onplay: props.onPlay,
  onpause: props.onPause,
  onvolume: props.onVolume,
  onstop: props.onStop,
  onrate: props.onRate,
  onload: props.onLoad,
  onloaderror: props.onLoadError,
  html5: props.html5 || false
})
```

## How to use Other howler.js methods

just pass a ref to `<RaptorHowler />` and you can access the latest howler instance using
`ref.current._howler` field.

```javascript
function App() {
  const apiRef = useRef(null);

  return (
    <div className="app">
      <RaptorHowler
        src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
        ref={apiRef}
      />
              
      <button
        onClick={() => {
          const { current: api } = apiRef;
          if (!api) return;
          console.log(api._howler.duration());
        }}>
        log audio duration
      </button>
    </div>
  );
}
```

Take a look at [api.ts](https://github.com/amirHossein-Ebrahimi/raptor-howler/blob/master/src/core/api.ts) for all pre-defined api which make your work easier

```javascript
<button
  onClick={() => {
    if (!apiRef.current) return;
    const playing = apiRef.current._playing();
    if (!playing) apiRef.current.play();
    else apiRef.current.pause();
  }}>
  Toggle playing state from (prop API)
</button>
```

---
## **Donation**

💻 Developer/Maintainer (**BTC**):
`bc1qq8qq63ex7svkkjdjn5axu8angfxytvs83nlujk`


## copyright

- The logo has been grabbed from [flat-icon](https://www.flaticon.com/free-icon/sound-bars-pulse_65129?related_id=65129&origin=pack) sound bars plus pack
- Code and documentation has been highly inspired by [react-howler](https://github.com/thangngoc89/react-howler)
- The audio file for examples are provided by [file-example](https://file-examples-com) website

License
MIT
