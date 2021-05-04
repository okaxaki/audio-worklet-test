let audioContext;
let node;
let isPlaying;

window.addEventListener('DOMContentLoaded', async () => {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  await audioContext.audioWorklet.addModule('./processor.js');
  document.getElementById('play').addEventListener('click', async () => {
    if (isPlaying) return;
    isPlaying = true;

    node = new (window.AudioWorkletNode || window.webkitAudioWorkletNode)(audioContext, 'my-processor');
    node.connect(audioContext.destination);
    
    document.body.classList.add('playing');
  });
});