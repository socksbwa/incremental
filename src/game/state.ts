import { ref } from "vue"

export const state = {
  numbers: ref(0),
  manualPower: ref(1),
  passiveRate: ref(0),
  globalMultiplier: ref(1),
  tickSpeed: ref(1),

  manualPowerAuto: ref(0),
  passiveRateAuto: ref(0),
  globalMultiplierAuto: ref(0),
  tickSpeedAuto: ref(0)
}