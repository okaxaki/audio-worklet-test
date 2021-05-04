const SAFARI_MODE = false;

let audioContext;
let node;
let currentFrame = 0;

async function initContext(loadWorklet) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  await audioContext.audioWorklet.addModule('./processor.js');
}

async function startWithAudioWorklet() {
  node = new (window.AudioWorkletNode || window.webkitAudioWorkletNode)(audioContext, 'my-processor');
  node.connect(audioContext.destination);
}

async function startWithScriptProcessor() {
  node = audioContext.createScriptProcessor(4096, 1, 1);
  node.onaudioprocess = (e) => {
    const channel = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < channel.length; i++) {
      channel[i] = 0.5 * Math.sin(440 * 2.0 * Math.PI * (currentFrame++) / audioContext.sampleRate);
    }
  };
  node.connect(audioContext.destination);
}

window.addEventListener('DOMContentLoaded', async () => {
  // If uncomment the following line,  AudioWorkletNode can produce sound on Safari 14.1.
  // await initContext(); 

  document.getElementById('play').addEventListener('click', async () => {
    if (audioContext == null) {
      await initContext();
    }

    const sel = document.getElementById('type');
    const type = sel.options[sel.selectedIndex].value;

    switch (type) {
      case 'worklet':
        startWithAudioWorklet();
        break;
      case 'script':
        startWithScriptProcessor();
        break;
      default:
        throw new Error('Uknown type: ' + type);
    }
    document.body.classList.add('playing');

  });

});