let audioContext;
let node;
let currentFrame = 0;
let isPlaying;

window.addEventListener('DOMContentLoaded', async () => {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  document.getElementById('play').addEventListener('click', async () => {
    if (isPlaying) return;
    isPlaying = true;

    node = audioContext.createScriptProcessor(4096, 1, 1);
    node.onaudioprocess = (e) => {
      const channel = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < channel.length; i++) {
        channel[i] = 0.5 * Math.sin(440 * 2.0 * Math.PI * (currentFrame++) / audioContext.sampleRate);
      }
    }
    node.connect(audioContext.destination);
    
    document.body.classList.add('playing');
  });
});