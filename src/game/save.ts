import { state } from "./state"
import { upgrades } from "./upgrades"

const SAVE_KEY = "incremental-save"

export function saveGame() {
  const saveData = {
    state: {
      numbers: state.numbers.value,

      manualPower: state.manualPower.value,
      passiveRate: state.passiveRate.value,
      globalMultiplier: state.globalMultiplier.value,
      tickSpeed: state.tickSpeed.value,

      manualPowerAuto: state.manualPowerAuto.value,
      passiveRateAuto: state.passiveRateAuto.value,
      globalMultiplierAuto: state.globalMultiplierAuto.value,
      tickSpeedAuto: state.tickSpeedAuto.value
    },

    upgrades: upgrades.map((u) => ({
      id: u.id,
      cost: u.cost,
      level: u.level,
      unlocked: u.unlocked
    }))
  }

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
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
  state.globalMultiplier.value = s.globalMultiplier
  state.tickSpeed.value = s.tickSpeed

  state.manualPowerAuto.value = s.manualPowerAuto
  state.passiveRateAuto.value = s.passiveRateAuto
  state.globalMultiplierAuto.value = s.globalMultiplierAuto
  state.tickSpeedAuto.value = s.tickSpeedAuto

  for (const savedUpgrade of saveData.upgrades) {
    const upgrade = upgrades.find((u) => u.id === savedUpgrade.id)

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

export function exportSaveFile() {
  saveGame()

  const rawSave = localStorage.getItem(SAVE_KEY)

  if (!rawSave) {
    return
  }

  const blob = new Blob([rawSave], {
    type: "text/plain"
  })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "incremental-save.txt"
  a.click()

  URL.revokeObjectURL(url)
}

export async function importSaveFile(file: File) {
  const text = await file.text()

  localStorage.setItem(SAVE_KEY, text)

  loadGame()
}

export function resetGame() {
  localStorage.removeItem(SAVE_KEY)

  location.reload()
}