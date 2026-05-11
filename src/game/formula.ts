import { formatNumber } from "./format"

import { computed } from "vue"
import katex from "katex"

import { state } from "./state"

export const currentFormula = computed(() => {
  const CBase = `{${formatNumber(state.manualPower.value)} \\small c}`
  const PBase = `{${formatNumber(state.passiveRate.value)} \\small s}`
  const TBase = `{${formatNumber(state.tickSpeed.value)} \\small s}`
  const MBase = `{${formatNumber(state.globalMultiplier.value)}}`

  const C = state.manualPowerExponent.value > 1
    ? `${CBase}^{${state.manualPowerExponent.value}}`
    : CBase

  const P = state.passiveRateExponent.value > 1
    ? `${PBase}^{${state.passiveRateExponent.value}}`
    : PBase

  const T = state.tickSpeedExponent.value > 1
    ? `${TBase}^{${state.tickSpeedExponent.value}}`
    : TBase

  const M = state.globalMultiplierExponent.value > 1
    ? `${MBase}^{${state.globalMultiplierExponent.value}}`
    : MBase

  const CB = `{${formatNumber(state.manualPowerAuto.value)} \\small s}`
  const PB = `{${formatNumber(state.passiveRateAuto.value)} \\small s}`
  const MB = `{${formatNumber(state.globalMultiplierAuto.value)} \\small s}`
  const TB = `{${formatNumber(state.tickSpeedAuto.value)} \\small s}`

  let clickTerm = `${C}`

  if (state.manualPowerAuto.value > 0) {
    clickTerm = `(${clickTerm} + ${CB})`
  }

  let formula = clickTerm

  if (state.passiveRate.value > 0) {
    let passiveTerm = `${P}`

    if (state.passiveRateAuto.value > 0) {
      passiveTerm = `(${passiveTerm} + ${PB})`
    }

    if (state.tickSpeed.value > 1) {
      let tickTerm = `${T}`

      if (state.tickSpeedAuto.value > 0) {
        tickTerm = `(${tickTerm} + ${TB})`
      }

      formula = `(${formula} + (${passiveTerm} \\cdot ${tickTerm}))`
    } else {
      formula = `(${formula} + ${passiveTerm})`
    }
  }

  if (state.globalMultiplier.value > 1) {
    let multiplierTerm = `${M}`

    if (state.globalMultiplierAuto.value > 0) {
      multiplierTerm = `(${multiplierTerm} + ${MB})`
    }

    formula = `${formula}${multiplierTerm}`
  }

  return formula
})

export const renderedFormula = computed(() => {
  return katex.renderToString(`N + ${currentFormula.value}`, {
    throwOnError: false,
    displayMode: true
  })
})