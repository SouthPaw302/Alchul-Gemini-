// Web Audio API ambient generator - no external audio files required
class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentMode: 'off' | 'wetland' | 'deep' = 'off';
  private gainNode: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private dripTimer: any = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMode(mode: 'off' | 'wetland' | 'deep') {
    this.init();
    if (this.currentMode === mode) return;
    this.stopCurrent();
    this.currentMode = mode;

    if (mode === 'off' || !this.ctx) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (mode === 'wetland') {
      this.startWetland();
    } else if (mode === 'deep') {
      this.startDeep();
    }
  }

  private stopCurrent() {
    if (this.dripTimer) {
      clearInterval(this.dripTimer);
      this.dripTimer = null;
    }
    this.nodes.forEach(n => {
      try {
        if ('stop' in n && typeof (n as any).stop === 'function') {
          (n as any).stop();
        }
        n.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.nodes = [];
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }

  private startWetland() {
    if (!this.ctx || !this.gainNode) return;

    // Pink noise generator for gentle river water & canopy wind
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate river water rushing around branches
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    // LFO to simulate gentle water surges
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);

    whiteNoise.start();
    lfo.start();

    this.nodes.push(whiteNoise, filter, lfo, lfoGain);

    // Subtle low subterranean rumble
    const rumble = this.ctx.createOscillator();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(58, this.ctx.currentTime);
    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    rumble.connect(rumbleGain);
    rumbleGain.connect(this.gainNode);
    rumble.start();
    this.nodes.push(rumble, rumbleGain);
  }

  private startDeep() {
    if (!this.ctx || !this.gainNode) return;

    // Subterranean resonant hum (48Hz fundamental)
    const sub1 = this.ctx.createOscillator();
    sub1.type = 'sine';
    sub1.frequency.setValueAtTime(48, this.ctx.currentTime);

    const sub2 = this.ctx.createOscillator();
    sub2.type = 'triangle';
    sub2.frequency.setValueAtTime(96.4, this.ctx.currentTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    sub1.connect(subGain);
    sub2.connect(subGain);
    subGain.connect(this.gainNode);

    sub1.start();
    sub2.start();
    this.nodes.push(sub1, sub2, subGain);

    // Bioluminescent crystalline harmonic shimmer (640Hz - 960Hz)
    const shimmer = this.ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(640, this.ctx.currentTime);
    const shimmerFilter = this.ctx.createBiquadFilter();
    shimmerFilter.type = 'bandpass';
    shimmerFilter.frequency.setValueAtTime(720, this.ctx.currentTime);
    shimmerFilter.Q.setValueAtTime(10, this.ctx.currentTime);

    const shimmerGain = this.ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    // Gentle shimmer modulation
    const mod = this.ctx.createOscillator();
    mod.frequency.setValueAtTime(0.1, this.ctx.currentTime);
    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(80, this.ctx.currentTime);
    mod.connect(modGain);
    modGain.connect(shimmer.frequency);

    shimmer.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(this.gainNode);

    shimmer.start();
    mod.start();
    this.nodes.push(shimmer, shimmerFilter, shimmerGain, mod, modGain);

    // Periodic gentle water droplet / mineral chime
    this.dripTimer = setInterval(() => {
      this.triggerMineralChime();
    }, 4500);
  }

  private triggerMineralChime() {
    if (!this.ctx || !this.gainNode || this.currentMode !== 'deep') return;
    try {
      const freq = [1046.5, 1174.66, 1318.5, 1567.98, 1760.0][Math.floor(Math.random() * 5)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(this.gainNode);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.9);
    } catch (e) {
      // ignore
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx && !this.isMuted) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMode() {
    return this.currentMode;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public getVolume() {
    return this.volume;
  }
}

export const soundEngine = new AmbientSoundEngine();
