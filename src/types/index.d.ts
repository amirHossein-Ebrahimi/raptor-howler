import { HowlCallback, HowlErrorCallback, Howl } from 'howler';

export interface HowlerParams {
  onStop?: HowlCallback;

  /**
   * Fires when the sound has been paused. The first parameter is the ID of the sound.
   */
  onPause?: HowlCallback;

  /**
   * Fires when the sound is loaded.
   */
  onLoad?: HowlCallback;

  /**
   * Fires when the sound has been muted/unmuted. The first parameter is the ID of the sound.
   */
  onMute?: HowlCallback;

  /**
   * Fires when the sound's volume has changed. The first parameter is the ID of the sound.
   */
  onVolume?: HowlCallback;

  /**
   * Fires when the sound's playback rate has changed. The first parameter is the ID of the sound.
   */
  onRate?: HowlCallback;

  /**
   * Fires when the sound has been seeked. The first parameter is the ID of the sound.
   */
  onSeek?: HowlCallback;

  /**
   * Fires when the current sound finishes fading in/out. The first parameter is the ID of the sound.
   */
  onFade?: HowlCallback;

  /**
   * Fires when audio has been automatically unlocked through a touch/click event.
   */
  onUnlock?: HowlCallback;

  /**
   * Fires when the sound finishes playing (if it is looping, it'll fire at the end of each loop).
   * The first parameter is the ID of the sound.
   */
  onEnd?: HowlCallback;

  /**
   * Fires when the sound begins playing. The first parameter is the ID of the sound.
   */
  onPlay?: HowlCallback;

  /**
   * Fires when the sound is unable to load. The first parameter is the ID of the sound (if it exists) and the second is the error message/code.
   */
  onLoadError?: HowlErrorCallback;

  /**
   * Fires when the sound is unable to play. The first parameter is the ID of the sound and the second is the error message/code.
   */
  onPlayError?: HowlErrorCallback;

  /**
   * The sources to the track(s) to be loaded for the sound (URLs or base64 data URIs). These should
   * be in order of preference, howler.js will automatically load the first one that is compatible
   * with the current browser. If your files have no extensions, you will need to explicitly specify
   * the extension using the format property.
   *
   * @default `[]`
   */
  src?: string | string[];

  /**
   * The volume of the specific track, from 0.0 to 1.0.
   *
   * @default `1.0`
   */
  volume?: number;

  /**
   * Set to true to force HTML5 Audio. This should be used for large audio files so that you don't
   * have to wait for the full file to be downloaded and decoded before playing.
   *
   * @default `false`
   */
  html5?: boolean;

  /**
   * Set to true to automatically loop the sound forever.
   *
   * @default `false`
   */
  loop?: boolean;

  /**
   * Automatically begin downloading the audio file when the Howl is defined. If using HTML5 Audio,
   * you can set this to 'metadata' to only preload the file's metadata (to get its duration without
   * download the entire file, for example).
   *
   * @default `true`
   */
  preload?: boolean | 'metadata';

  /**
   * Set to true to automatically start playback when sound is loaded.
   *
   * @default `false`
   */
  autoplay?: boolean;

  /**
   * Set to true to load the audio muted.
   *
   * @default `false`
   */
  mute?: boolean;

  /**
   * Define a sound sprite for the sound. The offset and duration are defined in milliseconds. A
   * third (optional) parameter is available to set a sprite as looping. An easy way to generate
   * compatible sound sprites is with audiosprite.
   *
   * @default `{}`
   */
  sprite?: {
    [name: string]: [number, number] | [number, number, boolean];
  };

  /**
   * The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
   *
   * @default `1.0`
   */
  rate?: number;

  /**
   * The size of the inactive sounds pool. Once sounds are stopped or finish playing, they are marked
   * as ended and ready for cleanup. We keep a pool of these to recycle for improved performance.
   * Generally this doesn't need to be changed. It is important to keep in mind that when a sound is
   * paused, it won't be removed from the pool and will still be considered active so that it can be
   * resumed later.
   *
   * @default `5`
   */
  pool?: number;

  /**
   * howler.js automatically detects your file format from the extension, but you may also specify a
   * format in situations where extraction won't work (such as with a SoundCloud stream).
   *
   * @default `[]`
   */
  format?: string[];

  /**
   * When using Web Audio, howler.js uses an XHR request to load the audio files. If you need to send
   * custom headers, set the HTTP method or enable withCredentials (see reference), include them with
   * this parameter. Each is optional (method defaults to GET, headers default to null and
   * withCredentials defaults to false).
   */
  xhr?: {
    method?: string;
    headers?: Record<string, string>;
    withCredentials?: true;
  };
}

interface RequiredProps {
  playing: boolean;
  src: string | string[];
}

export type RaptorHowlerProps = Partial<HowlerParams> & RequiredProps;

export type HowlerInstance = Howl;
