import React, { forwardRef, useEffect, useRef, MutableRefObject } from 'react';
import HowlerConnector, { APITypes } from './core';
import { RaptorHowlerProps } from './types';

export { APITypes } from './core';
export default forwardRef<APITypes, RaptorHowlerProps>(function RaptorHowler(
  { preload, playing, rate, mute, ...props },
  ref
) {
  const audioRef = useRef<APITypes>(null);

  useEffect(() => {
    const { current: api } = audioRef;
    if (playing) api!.play();
    else api!.pause();
  }, [playing]);

  useEffect(() => {
    if (rate != null) audioRef.current!.rate(rate);
  }, [rate]);

  useEffect(() => {
    if (mute) audioRef.current!.mute(mute);
  }, [mute]);

  useEffect(() => {
    const { current: api } = audioRef;
    if (preload && api!.state() === 'unloaded') api!.load();
  }, [preload]);

  return (
    <HowlerConnector
      ref={(n) => {
        // forward pass apis to outer ref, inspired by react-fork-ref package
        if (ref) (ref as MutableRefObject<APITypes | null>).current = n;
        (audioRef as MutableRefObject<APITypes | null>).current = n;
      }}
      preload={preload}
      rate={rate}
      mute={mute}
      {...props}
    />
  );
});
