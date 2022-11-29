export default class ShowFilterChain {
  constructor(ac) {
    this.ac = ac;
    this.in = ac.createGain();
    this.out = ac.createGain();

    this.wetMix = ac.createGain();
    this.dryMix = ac.createGain();

    this.convolver = ac.createConvolver();

    const genRandom = (...args) => {
      const buf = ac.createBuffer(...args);
      for (let i = 0; i < buf.numberOfChannels; i++) {
        const chan = buf.getChannelData(i);
        for (let i = 0; i < buf.length; i++) {
          chan[i] = Math.random() * Math.pow(Math.max(0, Math.min(1, 1-i/buf.length)), 3);
        }
      }
      return buf;
    };
    this.convolver.buffer = genRandom(2, ac.sampleRate * 2, ac.sampleRate);

    this.hp = ac.createBiquadFilter();
    this.hp.type = 'highpass';
    this.hp.frequency.value = 20;

    this.in.connect(this.dryMix);
    this.in.connect(this.convolver);
    this.convolver.connect(this.wetMix);

    this.compGain = ac.createGain();
    this.compGain.gain.value = 2;
    this.compressor = ac.createDynamicsCompressor();

    this.dryMix.connect(this.hp);
    // this.wetMix.connect(this.hp);

    this.hp.connect(this.compGain);
    this.compGain.connect(this.compressor);

    this.compressor.connect(this.out);
  }

  update() {
  }
}
