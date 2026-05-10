let audioContext: AudioContext | null = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext()
  }

  return audioContext
}

export async function playClickSound() {
  const ctx = getAudioContext()

  if (ctx.state === "suspended") {
    await ctx.resume()
  }

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = "sine"
  oscillator.frequency.value = 440

  gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.08
  )

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.08)
}

export async function playUpgradeSound() {
  const ctx = getAudioContext()

  if (ctx.state === "suspended") {
    await ctx.resume()
  }

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = "sine"

  oscillator.frequency.setValueAtTime(
    660,
    ctx.currentTime
  )

  oscillator.frequency.exponentialRampToValueAtTime(
    1320,
    ctx.currentTime + 0.12
  )

  gainNode.gain.setValueAtTime(
    0.06,
    ctx.currentTime
  )

  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.18
  )

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.18)
}