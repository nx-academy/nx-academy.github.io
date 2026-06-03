/* NX Arcade — sound effects.
   The design prototype used procedural WebAudio blips as placeholders; here we
   reuse NX's real SFX files (the same /sounds/*.mp3 the classic Quiz uses).
   Lazily creates <audio> elements on the first user gesture and honours a mute
   toggle that persists in localStorage under "nx-arcade-muted". */

const MUTED_KEY = "nx-arcade-muted";

type Clip = "click" | "success" | "error";

const SOURCES: Record<Clip, { mp3: string; ogg: string }> = {
  click: { mp3: "/sounds/click.mp3", ogg: "/sounds/click.ogg" },
  success: { mp3: "/sounds/success.mp3", ogg: "/sounds/success.ogg" },
  error: { mp3: "/sounds/error.mp3", ogg: "/sounds/error.ogg" },
};

let muted =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(MUTED_KEY) === "1";

const elements: Partial<Record<Clip, HTMLAudioElement>> = {};
let ready = false;

function canPlayOgg(audio: HTMLAudioElement): boolean {
  return audio.canPlayType("audio/ogg") !== "";
}

function prepare(): void {
  if (ready || typeof Audio === "undefined") return;
  (Object.keys(SOURCES) as Clip[]).forEach((clip) => {
    const audio = new Audio();
    audio.src = canPlayOgg(audio) ? SOURCES[clip].ogg : SOURCES[clip].mp3;
    audio.preload = "auto";
    elements[clip] = audio;
  });
  ready = true;
}

function play(clip: Clip): void {
  if (muted) return;
  prepare();
  const audio = elements[clip];
  if (!audio) return;
  audio.currentTime = 0;
  // Browsers reject playback before a user gesture — ignore that rejection.
  audio.play().catch(() => {});
}

export const NXSound = {
  get muted(): boolean {
    return muted;
  },
  setMuted(value: boolean): void {
    muted = value;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(MUTED_KEY, value ? "1" : "0");
    }
  },
  /** Call on the first user gesture so playback is unlocked. */
  init(): void {
    prepare();
  },
  select(): void {
    play("click");
  },
  start(): void {
    play("success");
  },
  correct(): void {
    play("success");
  },
  wrong(): void {
    play("error");
  },
  oneup(): void {
    play("success");
  },
  clear(): void {
    play("success");
  },
  over(): void {
    play("error");
  },
};
