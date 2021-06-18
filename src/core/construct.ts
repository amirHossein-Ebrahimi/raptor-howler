import { Howl } from "howler";
import { HowlerParams } from "../types";

/**
 * Create howler object with given props
 */
export default function instantiate(_: any, params: HowlerParams) {
  if (Howl) {
    return new Howl({
      src: params.src,
      xhr: params.xhr || {},
      format: params.format || [],
      mute: params.mute || false,
      loop: params.loop || false,
      preload: params.preload || false,
      rate: params.rate || 1.0,
      volume: params.volume || 1.0,
      onend: params.onEnd,
      onplay: params.onPlay,
      onpause: params.onPause,
      onvolume: params.onVolume,
      onstop: params.onStop,
      onrate: params.onRate,
      onload: params.onLoad,
      onloaderror: params.onLoadError,
      html5: params.html5 || false
    });
  }

  return null;
}

/**
 * Stop, unload and destroy howler object
 */
export const destroy = (howler: Howl | null) => {
  if (howler) {
    howler.off(); // Remove event listener
    howler.stop(); // Stop playback
    howler.unload(); // Remove sound from pool
    // howler = null; // Note: No need for extra removal
  }
};
