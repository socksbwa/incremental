import { state } from "./state"
import { upgrades } from "./upgrades"

const SAVE_KEY = "incremental-save"

export function saveGame() {

  const saveData = {

    state: {
      numbers: state.numbers.value,
      manualPower: state.manualPower.value,
      passiveRate: state.passiveRate.value,
      tickSpeed: state.tickSpeed.value,
      globalMultiplier: state.globalMultiplier.value,

      manualPowerAuto: state.manualPowerAuto.value,
      passiveRateAuto: state.passiveRateAuto.value,
      tickSpeedAuto: state.tickSpeedAuto.value,
      globalMultiplierAuto: state.globalMultiplierAuto.value
    },

    upgrades: upgrades.map(u => ({
      id: u.id,
      cost: u.cost,
      level: u.level,
      unlocked: u.unlocked
    }))
  }

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(saveData)
  )
}

export function loadGame() {

  const rawSave = localStorage.getItem(SAVE_KEY)

  if (!rawSave) {
    return
  }

  const saveData = JSON.parse(rawSave)

  const s = saveData.state

  state.numbers.value = s.numbers
  state.manualPower.value = s.manualPower
  state.passiveRate.value = s.passiveRate
  state.tickSpeed.value = s.tickSpeed
  state.globalMultiplier.value = s.globalMultiplier

  state.manualPowerAuto.value = s.manualPowerAuto
  state.passiveRateAuto.value = s.passiveRateAuto
  state.tickSpeedAuto.value = s.tickSpeedAuto
  state.globalMultiplierAuto.value = s.globalMultiplierAuto

  for (const savedUpgrade of saveData.upgrades) {

    const upgrade = upgrades.find(
      u => u.id === savedUpgrade.id
    )

    if (!upgrade) {
      continue
    }

    upgrade.cost = savedUpgrade.cost
    upgrade.level = savedUpgrade.level
    upgrade.unlocked = savedUpgrade.unlocked
  }
}

export function startAutoSave() {
  setInterval(() => {
    saveGame()
  }, 5000)
}