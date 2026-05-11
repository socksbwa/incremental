import { computed } from "vue"
import { state } from "./state"

export const complexity = computed(() => {
  let value = 1

  value += state.manualPowerExponent.value - 1
  value += state.passiveRateExponent.value - 1
  value += state.tickSpeedExponent.value - 1
  value += state.globalMultiplierExponent.value - 1

  if (state.passiveRate.value > 0) value += 1
  if (state.tickSpeed.value > 1) value += 1
  if (state.globalMultiplier.value > 1) value += 2

  if (state.manualPowerAuto.value > 0) value += 1
  if (state.passiveRateAuto.value > 0) value += 1
  if (state.tickSpeedAuto.value > 0) value += 1
  if (state.globalMultiplierAuto.value > 0) value += 2

  return value
})

export const milestones = computed(() => [
  {
    id: "manual-mastery",
    title: "Manual Mastery",
    description: "Reach C exponent 2",
    completed: state.manualPowerExponent.value >= 2,
    claimed: state.milestoneManualBoost.value > 1,

    claim() {
      if (
        state.manualPowerExponent.value >= 2 &&
        state.milestoneManualBoost.value === 1
      ) {
        state.milestoneManualBoost.value = 1.25
      }
    }
  },

  {
    id: "passive-mastery",
    title: "Passive Mastery",
    description: "Reach P exponent 2",
    completed: state.passiveRateExponent.value >= 2,
    claimed: state.milestonePassiveBoost.value > 1,

    claim() {
      if (
        state.passiveRateExponent.value >= 2 &&
        state.milestonePassiveBoost.value === 1
      ) {
        state.milestonePassiveBoost.value = 1.25
      }
    }
  },

  {
    id: "tick-mastery",
    title: "Tick Mastery",
    description: "Reach T exponent 2",
    completed: state.tickSpeedExponent.value >= 2,
    claimed: state.milestoneTickBoost.value > 1,

    claim() {
      if (
        state.tickSpeedExponent.value >= 2 &&
        state.milestoneTickBoost.value === 1
      ) {
        state.milestoneTickBoost.value = 1.25
      }
    }
  },

  {
    id: "multiplier-mastery",
    title: "Multiplier Mastery",
    description: "Reach M exponent 2",
    completed: state.globalMultiplierExponent.value >= 2,
    claimed: state.milestoneMultiplierBoost.value > 1,

    claim() {
      if (
        state.globalMultiplierExponent.value >= 2 &&
        state.milestoneMultiplierBoost.value === 1
      ) {
        state.milestoneMultiplierBoost.value = 1.25
      }
    }
  },

  {
    id: "stage1",
    title: "Formula Stabilized",
    description: "Reach Complexity 12",
    completed: complexity.value >= 12,
    claimed: false,

    claim() {
      // later this can unlock Stage 2
    }
  }
])