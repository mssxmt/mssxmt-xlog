'use client';

import { useState } from 'react';
import { motion } from '../../lib/motion-store';
import Magnetic from './Magnetic';

type Engine = { stop: () => void };
let engine: Engine | null = null;

/**
 * Generative audio: a Tone.js procedural loop (kick / snare / hats /
 * acid-ish bass at 138 BPM, C minor). No audio files. Analyser levels
 * are written into the motion store, where the WebGL scene reads them.
 */
async function startEngine(): Promise<Engine> {
  const Tone = await import('tone');
  await Tone.start();

  const analyser = new Tone.Analyser('fft', 64);
  const master = new Tone.Gain(0.5);
  master.connect(analyser);
  analyser.toDestination();

  const kick = new Tone.MembraneSynth({
    octaves: 6,
    envelope: { attack: 0.001, decay: 0.38, sustain: 0.01, release: 0.4 },
  }).connect(master);
  kick.volume.value = -7;
  const snare = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.001, decay: 0.16, sustain: 0 },
  }).connect(master);
  snare.volume.value = -13;
  const hat = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
  }).connect(master);
  hat.volume.value = -19;
  const bass = new Tone.MonoSynth({
    oscillator: { type: 'sawtooth' },
    filter: { Q: 2, type: 'lowpass', rolloff: -24 },
    envelope: { attack: 0.004, decay: 0.18, sustain: 0.4, release: 0.3 },
    filterEnvelope: { attack: 0.002, decay: 0.12, sustain: 0.3, baseFrequency: 90, octaves: 3.2 },
  }).connect(master);
  bass.volume.value = -11;

  const transport = Tone.getTransport();
  transport.bpm.value = 138;
  const line = ['C2', 'C2', 'Eb2', 'C2', 'F2', 'C2', 'G2', 'Ab2', 'C2', 'C2', 'Eb2', 'D2', 'F2', 'C2', 'G2', 'Bb2'];
  let step = 0;
  const loop = new Tone.Loop((time) => {
    const s = step % 16;
    if (s % 4 === 0) kick.triggerAttackRelease('C1', '8n', time);
    if (s === 4 || s === 12) snare.triggerAttackRelease('16n', time);
    if (s % 2 === 1) hat.triggerAttackRelease('32n', time, 0.3 + Math.random() * 0.4);
    if (Math.random() < 0.82) bass.triggerAttackRelease(line[step % 16], '16n', time);
    step++;
  }, '16n').start(0);
  transport.start();

  let raf = 0;
  let b = 0;
  let h = 0;
  const tick = () => {
    const v = analyser.getValue() as Float32Array;
    const avg = (a: number, z: number) => {
      let s = 0;
      for (let i = a; i < z; i++) s += v[i];
      return s / (z - a);
    };
    const tb = Math.min(1, Math.max(0, (avg(1, 6) + 92) / 48));
    const th = Math.min(1, Math.max(0, (avg(20, 44) + 96) / 52));
    b += (tb - b) * 0.3;
    h += (th - h) * 0.3;
    motion.audio.bass = b;
    motion.audio.high = h;
    raf = requestAnimationFrame(tick);
  };
  tick();

  return {
    stop: () => {
      cancelAnimationFrame(raf);
      loop.stop();
      transport.stop();
      transport.cancel();
      [kick, snare, hat, bass, master, analyser].forEach((n) => n.dispose());
      motion.audio.bass = 0;
      motion.audio.high = 0;
    },
  };
}

/** Footer toggle for the generative audio + audio-reactive visuals. */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const toggle = async () => {
    if (busy) return;
    if (on) {
      engine?.stop();
      engine = null;
      motion.audio.on = false;
      setOn(false);
      return;
    }
    setBusy(true);
    try {
      engine = await startEngine();
      motion.audio.on = true;
      setOn(true);
    } catch {
      engine = null;
    } finally {
      setBusy(false);
    }
  };
  return (
    <Magnetic strength={0.25}>
      <button
        type='button'
        onClick={toggle}
        aria-pressed={on}
        className='font-mono text-[10px] tracking-[0.18em] text-[#8a877e] transition-colors hover:text-[#e8e6df]'
      >
        SOUND{' '}
        <span className={on ? 'text-[#57d7c8]' : undefined}>{busy ? '...' : on ? 'ON' : 'OFF'}</span>
        {on && <span className='ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#57d7c8] align-middle' />}
      </button>
    </Magnetic>
  );
}
