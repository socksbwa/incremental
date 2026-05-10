import { state } from "./state"

let gameLoopStarted = false

export function generateNumber() {
  state.numbers.value += state.manualPower.value * state.globalMultiplier.value
}

export function startGameLoop() {
  if (gameLoopStarted) {
    return
  }

  gameLoopStarted = true

  setInterval(() => {
    state.numbers.value += state.passiveRate.value * state.globalMultiplier.value * state.tickSpeed.value
    state.manualPower.value += state.manualPowerAuto.value
    state.passiveRate.value += state.passiveRateAuto.value
    state.globalMultiplier.value += state.globalMultiplierAuto.value
    state.tickSpeed.value += state.tickSpeedAuto.value
  }, 1000)
}