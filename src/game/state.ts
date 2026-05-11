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
  tickSpeedAuto: ref(0),

  manualPowerExponent: ref(1),
  passiveRateExponent: ref(1),
  tickSpeedExponent: ref(1),
  globalMultiplierExponent: ref(1),

  milestoneManualBoost: ref(1),
  milestonePassiveBoost: ref(1),
  milestoneTickBoost: ref(1),
  milestoneMultiplierBoost: ref(1)
}