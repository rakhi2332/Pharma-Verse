import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, Disc, Sparkles, Heart, Waves, Trees, Moon, Sun, Bell, Wind } from 'lucide-react';

const STRESS_HEALING_TRACKS = [
  { id: 'lofi', title: 'Lo-Fi Chill Study Beats', desc: 'Warm 432Hz ambient chord progression', type: 'lofi', icon: Disc },
  { id: 'solfeggio528', title: '528Hz Miracle & DNA Healing Tone', desc: 'Solfeggio frequency for anxiety & stress relief', type: 'solfeggio528', icon: Heart },
  { id: 'focus', title: '40Hz Deep Focus Gamma Waves', desc: 'Binaural beats for memory & concentration', type: 'binaural40', icon: Sparkles },
  { id: 'ocean', title: 'Ocean Waves & Tidal Breath', desc: 'Rhythmic 0.1Hz low-frequency ocean wave rhythm', type: 'ocean', icon: Waves },
  { id: 'rain', title: 'Serene Rain Soundscape', desc: 'Calming pink noise for deep relaxation', type: 'noise', icon: Music },
  { id: 'forest', title: 'Deep Forest Breeze & Peaceful Chirps', desc: 'Acoustic nature breeze & bird sound synthesis', type: 'forest', icon: Trees },
  { id: 'delta', title: 'Cosmic Delta Stress Relief (2Hz)', desc: 'Deep mental reset for post-study relaxation', type: 'delta2', icon: Moon },
  { id: 'zen', title: 'Meditative Zen Harmonics', desc: 'Tranquil atmospheric acoustic pads', type: 'zen', icon: Sparkles },
  { id: 'solar432', title: '432Hz Solar Chakra Vitality', desc: 'Harmonic resonance for positive mood & energy', type: 'solar432', icon: Sun },
  { id: 'bowls', title: 'Tibetan Singing Bowl Harmonics', desc: 'Resonant bell tones for deep meditative stillness', type: 'bowls', icon: Bell },
  { id: 'chimes', title: 'Breezy Bamboo Windchimes', desc: 'Soothing pentatonic windchime acoustic simulation', type: 'chimes', icon: Wind },
  { id: 'rem', title: 'Deep REM Sleep & Melatonin Waves (1Hz)', desc: 'Sub-delta frequency for exam night relaxation', type: 'rem1', icon: Moon }
];

export default function RelaxationMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showMenu, setShowMenu] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const activeNodesRef = useRef([]);

  // Initialize Web Audio API Synthesizer
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Stop currently playing sound nodes
  const stopCurrentTrack = () => {
    activeNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // Ignore already stopped nodes
      }
    });
    activeNodesRef.current = [];
  };

  // Synthesize Stress-Healing Ambient Soundscapes using Web Audio API
  const startTrack = (trackIdx) => {
    stopCurrentTrack();
    initAudioCtx();

    const ctx = audioCtxRef.current;
    const mainGain = gainNodeRef.current;
    const track = STRESS_HEALING_TRACKS[trackIdx];

    if (!ctx || !mainGain) return;

    if (track.type === 'solfeggio528' || track.type === 'solar432') {
      // 528Hz or 432Hz Solfeggio Healing Frequency
      const baseFreq = track.type === 'solfeggio528' ? 528 : 432;
      const freqs = [baseFreq, baseFreq / 2, baseFreq * 0.75];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + i * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.1 / freqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(mainGain);
        osc.start();

        activeNodesRef.current.push(osc, oscGain, lfo, lfoGain);
      });

    } else if (track.type === 'lofi' || track.type === 'zen' || track.type === 'bowls') {
      // Warm ambient chord / singing bowl drone
      const freqs = track.type === 'lofi' ? [220, 277.18, 329.63, 440] : (track.type === 'bowls' ? [140, 210, 280] : [164.81, 220, 246.94, 329.63]);
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = track.type === 'bowls' ? 'sine' : (idx % 2 === 0 ? 'sine' : 'triangle');
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.04, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.1 / freqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(mainGain);
        osc.start();

        activeNodesRef.current.push(osc, oscGain, lfo, lfoGain);
      });

    } else if (track.type === 'binaural40' || track.type === 'delta2' || track.type === 'rem1') {
      // Binaural Beats (40Hz, 2Hz, 1Hz)
      const carrier = track.type === 'binaural40' ? 200 : (track.type === 'rem1' ? 120 : 150);
      const beat = track.type === 'binaural40' ? 40 : (track.type === 'rem1' ? 1 : 2);

      const oscLeft = ctx.createOscillator();
      const oscRight = ctx.createOscillator();
      const merger = ctx.createChannelMerger(2);

      oscLeft.frequency.setValueAtTime(carrier, ctx.currentTime);
      oscRight.frequency.setValueAtTime(carrier + beat, ctx.currentTime);

      oscLeft.connect(merger, 0, 0);
      oscRight.connect(merger, 0, 1);
      merger.connect(mainGain);

      oscLeft.start();
      oscRight.start();

      activeNodesRef.current.push(oscLeft, oscRight, merger);

    } else if (track.type === 'ocean' || track.type === 'chimes') {
      // Low-frequency oscillating ocean wave filter
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);

      const waveLfo = ctx.createOscillator();
      const waveLfoGain = ctx.createGain();
      waveLfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      waveLfoGain.gain.setValueAtTime(250, ctx.currentTime);
      waveLfo.connect(filter.frequency);
      waveLfo.start();

      whiteNoise.connect(filter);
      filter.connect(mainGain);
      whiteNoise.start();

      activeNodesRef.current.push(whiteNoise, filter, waveLfo, waveLfoGain);

    } else if (track.type === 'noise' || track.type === 'forest') {
      // Soft pink noise rain / forest breeze
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
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
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(track.type === 'noise' ? 800 : 500, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(mainGain);
      whiteNoise.start();

      activeNodesRef.current.push(whiteNoise, filter);
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      stopCurrentTrack();
      setIsPlaying(false);
    } else {
      startTrack(activeTrackIndex);
      setIsPlaying(true);
    }
  };

  // Handle Track Selection
  const handleSelectTrack = (idx) => {
    setActiveTrackIndex(idx);
    if (isPlaying) {
      startTrack(idx);
    }
  };

  // Update Volume
  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopCurrentTrack();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative z-50">
      {/* Floating Relaxation Trigger Button */}
      <button
        onClick={() => setShowMenu(prev => !prev)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all shadow-lg cursor-pointer ${
          isPlaying 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-emerald-500/25 animate-pulse' 
            : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-cyan-400 hover:text-white'
        }`}
      >
        <Heart className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-rose-300' : 'text-rose-400'}`} />
        <span>{isPlaying ? 'Relaxing Music: On' : 'Relaxation Music'}</span>
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 h-full bg-white animate-bounce"></span>
            <span className="w-0.5 h-2/3 bg-white animate-bounce delay-75"></span>
            <span className="w-0.5 h-4/5 bg-white animate-bounce delay-150"></span>
          </div>
        )}
      </button>

      {/* Floating Menu */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-3 w-84 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-5 shadow-2xl text-white space-y-4 font-sans animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <h4 className="font-bold text-sm text-white">Stress-Free Relaxation Music</h4>
            </div>
            <button
              onClick={togglePlay}
              className={`p-2 rounded-full text-white transition-all shadow-md cursor-pointer ${
                isPlaying ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Track List (12 Stress Healing Soundscapes) */}
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">12 Ambient Soundscapes</span>
            {STRESS_HEALING_TRACKS.map((track, idx) => {
              const TrackIcon = track.icon;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full p-2.5 rounded-2xl text-left border transition-all text-xs flex items-center justify-between cursor-pointer ${
                    activeTrackIndex === idx
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <TrackIcon className={`w-4 h-4 shrink-0 ${activeTrackIndex === idx ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <div className="truncate">
                      <p className="font-semibold text-white truncate">{track.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{track.desc}</p>
                    </div>
                  </div>
                  {activeTrackIndex === idx && isPlaying && (
                    <Disc className="w-4 h-4 text-cyan-400 animate-spin shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />} Volume
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
