/* export をつけると Safari 14.1 で動作しない FireFox 88.0, Chrome 90.0.4430.93 は OK */
class MyAudioWorkletProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [] };

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = 0.5 * Math.sin(440 * 2.0 * Math.PI * (currentFrame + i) / sampleRate);
      }
    });
    return true;
  }
}
registerProcessor('my-processor', MyAudioWorkletProcessor);
