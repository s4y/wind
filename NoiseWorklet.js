class NoiseWorklet extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    for (const channel of outputs[0])
      for (let i = 0; i < channel.length; i++)
        channel[i] = Math.random();
    return true;
  }
}

registerProcessor('noise-source', NoiseWorklet)

