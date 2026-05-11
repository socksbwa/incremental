import { state } from "./state"

let gameLoopStarted = false

export function generateNumber() {
  const manualEffect =
    state.manualPower.value ** state.manualPowerExponent.value

  const multiplierEffect =
    state.globalMultiplier.value ** state.globalMultiplierExponent.value

  state.numbers.value +=
    manualEffect *
    multiplierEffect
}

export function startGameLoop() {
  if (gameLoopStarted) {
    return
  }

  gameLoopStarted = true

  setInterval(() => {
    const passiveEffect =
      (state.passiveRate.value ** state.passiveRateExponent.value) *
      state.milestonePassiveBoost.value

    const tickEffect =
      (state.tickSpeed.value ** state.tickSpeedExponent.value) *
      state.milestoneTickBoost.value

    const multiplierEffect =
      (state.globalMultiplier.value ** state.globalMultiplierExponent.value) *
      state.milestoneMultiplierBoost.value

    state.numbers.value +=
      passiveEffect *
      tickEffect *
      multiplierEffect

    state.manualPower.value += state.manualPowerAuto.value
    state.passiveRate.value += state.passiveRateAuto.value
    state.globalMultiplier.value += state.globalMultiplierAuto.value
    state.tickSpeed.value += state.tickSpeedAuto.value
  }, 1000)
}