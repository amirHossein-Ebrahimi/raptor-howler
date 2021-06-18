import React, { useRef, useState, MutableRefObject } from 'react';
import RaptorHowler, { APITypes } from 'raptor-howler';
import { Howl } from 'howler';
import './app.css';

let outerScopeRef: MutableRefObject<APITypes | null> = { current: null };
const transportRef = (ref: MutableRefObject<APITypes | null>) => {
  outerScopeRef = ref;
};
const pauseOn2Sec = () => {
  const { current: api } = outerScopeRef;
  if (!api) {
    console.log('no api defined yet');
    return;
  }

  setTimeout(api.pause, 2000);
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const apiRef = useRef<APITypes>(null);
  transportRef(apiRef);

  return (
    <div className="app">
      <RaptorHowler
        src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
        playing={isPlaying}
        ref={apiRef}
      />

      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'pause' : 'play'} audio (prop Change)
      </button>

      <button
        onClick={() => {
          if (!apiRef.current) return;
          const playing = apiRef.current!._playing();
          if (!playing) apiRef.current!.play();
          else apiRef.current!.pause();
        }}>
        Toggle playing state from (prop API)
      </button>

      <p>
        Use apis outside of react component, in your effects or logical part Pause audio in about 2
        second
      </p>
      <button onClick={pauseOn2Sec}>Pause audio in 2 sec</button>

      <p>
        Use all of hwoler packge inside your react without extra work Also this make it possible to
        upgrade howler independant of <b>raptor-howler</b> 🎉
      </p>
      <button
        onClick={() => {
          const { current: api } = apiRef;
          if (!api) return;
          console.log((api._howler as Howl).duration());
        }}>
        log duration
      </button>
    </div>
  );
}

export default App;
