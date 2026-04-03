import numpy as np
import scipy.io.wavfile as wavfile
import os

# Create public directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# Parameters
sample_rate = 44100

def save_wav(filename, data):
    wavfile.write(os.path.join('public', filename), sample_rate, data.astype(np.float32))

# 1. Impact / Bass Drop (for scene transitions)
t_impact = np.linspace(0, 1.5, int(sample_rate * 1.5))
freq_impact = np.geomspace(150, 20, len(t_impact))
impact = np.sin(2 * np.pi * freq_impact * t_impact)
# Envelope: sharp attack, long decay
env_impact = np.exp(-3 * t_impact)
impact = impact * env_impact
save_wav('impact.wav', impact)

# 2. Riser / Build-up (for building tension before a drop)
t_riser = np.linspace(0, 3.0, int(sample_rate * 3.0))
freq_riser = np.geomspace(50, 1500, len(t_riser))
riser = np.sin(2 * np.pi * freq_riser * t_riser)
# Add some noise for texture
noise = np.random.normal(0, 0.2, len(t_riser))
riser = riser + noise
# Envelope: slow build up
env_riser = t_riser / 3.0
riser = riser * env_riser
save_wav('riser.wav', riser)

# 3. Whoosh (for fast UI transitions)
t_whoosh = np.linspace(0, 0.5, int(sample_rate * 0.5))
whoosh_noise = np.random.normal(0, 1, len(t_whoosh))
# Filter with a sweeping bandpass (approximated here with sine modulation)
mod = np.sin(np.pi * t_whoosh / 0.5)
whoosh = whoosh_noise * mod
save_wav('whoosh.wav', whoosh)

# 4. Data / Tech Bleeps (for AI/Tech theme)
t_bleep = np.linspace(0, 0.1, int(sample_rate * 0.1))
bleep1 = np.sin(2 * np.pi * 880 * t_bleep)
bleep2 = np.sin(2 * np.pi * 1200 * t_bleep)
# Envelope for short sharp bleeps
env_bleep = np.exp(-20 * t_bleep)
bleep1 = bleep1 * env_bleep
bleep2 = bleep2 * env_bleep

# Create a sequence of bleeps
data_sequence = np.concatenate([bleep1, np.zeros_like(bleep1), bleep2, np.zeros_like(bleep2), bleep1])
save_wav('data_bleep.wav', data_sequence)

# 5. Ambient Pad (background drone)
t_pad = np.linspace(0, 10, int(sample_rate * 10))
pad1 = np.sin(2 * np.pi * 220 * t_pad)
pad2 = np.sin(2 * np.pi * 222 * t_pad) # Detuned for chorus
pad3 = np.sin(2 * np.pi * 330 * t_pad) # Fifth
pad = (pad1 + pad2 + pad3) / 3
# Slow envelope
env_pad = np.sin(np.pi * t_pad / 10)
pad = pad * env_pad * 0.3 # Keep it quiet
save_wav('ambient.wav', pad)

print("Audio files generated in public directory.")
