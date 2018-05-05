ASSETS_PATH = './';
ANIMATIONS = [
  { src: 'images/animation/waiting.mp4', id: 'waiting' }
];
SOUNDS = [
  { src: 'sounds/button_hi.mp3', id: 'button_hi' },
  { src: 'sounds/button_low.mp3', id: 'button_low' },
  { src: 'sounds/button_on.mp3', id: 'button_on' },
  { src: 'sounds/crowd.mp3', id: 'crowd' },
  { src: 'sounds/final_fail.mp3', id: 'final_fail' },
  { src: 'sounds/final_win.mp3', id: 'final_win' },
  { src: 'sounds/goal.mp3', id: 'goal' },
  { src: 'sounds/miss.mp3', id: 'miss' },
  { src: 'sounds/music_1.mp3', id: 'music_1' },
  { src: 'sounds/music_2.mp3', id: 'music_2' }
];

const init = () => {
  const manifest = [...ANIMATIONS, ...SOUNDS];
  loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, ASSETS_PATH);
};

const handleComplete = () => {
  const musicInstance = createjs.Sound.play("music_1", { interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4 });
};

const playSound = (target) => {
	const instance = createjs.Sound.play(target.dataset.sound);
	if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
		return;
	}
};

const stopThenPlay = (...args) => {
  createjs.Sound.stop();
  args.forEach((sound) => {
    createjs.Sound.play(sound.name, { interrupt: createjs.Sound.INTERRUPT_NONE, loop: sound.loop, volume: sound.volume });
  });
};

window.onload = () => {
  init();
};
