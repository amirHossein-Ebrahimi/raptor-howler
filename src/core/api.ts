import { noop } from '../helper';
import { Howl } from 'howler';

type HowlerInstance = Howl | null;

export default function getAPI(howler: HowlerInstance) {
  if (!howler)
    return (): Record<string, typeof noop> =>
      new Proxy(
        {},
        {
          get: (_, prop) => {
            if (prop === '_howler') return Howl;
            if (prop === 'seek') return () => 0;
            return noop;
          },
        }
      );

  return () => ({
    _playing: howler.playing.bind(howler),
    /**
     * Begins playback of a sound when not playing
     */
    play() {
      if (!this._playing()) {
        // Automatically load if we're trying to play
        // and the howl is not loaded
        if (this.state() === 'unloaded') howler.load();
        howler.play();
      }
    },
    /**
     * Pauses playback of sound or group
     * If no id given, pauses all playback
     * @param {Number} id = undefined [sound of group to pause]
     */
    pause: howler.pause.bind(howler),
    /**
     * NOTE: no limitation of naming for state :)
     * Check the load status of the Howl
     * @return {String} [unloaded, loading or loaded]
     */
    state() {
      return howler.state();
    },

    /**
     * Mutes the sound, but doesn't pause the playback.
     * @param {Boolean} [muted] [True to mute and false to unmute]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */
    mute: howler.mute,

    /**
     * Get/set the rate of playback for a sound. This method optionally takes 0, 1 or 2 arguments.
     * @param {Number} [rate] - The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
     * @param {Number} [id] - The sound ID. If none is passed, playback rate of all sounds in group will change.
     */
    rate: howler.rate.bind(howler),

    /**
     * load audio file
     */
    load: howler.load.bind(howler),

    /**
     * Howler instance with all of its functionality
     */
    _howler: howler,
  });
}

// reference api in destroy
export type APITypes = ReturnType<ReturnType<typeof getAPI>>;
