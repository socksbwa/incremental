import { formatNumber } from "./format"

import { computed } from "vue"
import katex from "katex"

import { state } from "./state"

export const currentFormula = computed(() => {

  const C = `C{\\scriptsize[${formatNumber(state.manualPower.value)}]}`
  const P = `P{\\scriptsize[${formatNumber(state.passiveRate.value)}]}`
  const T = `T{\\scriptsize[${formatNumber(state.tickSpeed.value)}]}`
  const M = `M{\\scriptsize[${formatNumber(state.globalMultiplier.value)}]}`

  const CB = `{\\tiny [+C\\ ${formatNumber(state.manualPowerAuto.value)}/s]}`
  const PB = `{\\tiny [+P\\ ${formatNumber(state.passiveRateAuto.value)}/s]}`
  const MB = `{\\tiny [+M\\ ${formatNumber(state.globalMultiplierAuto.value)}/s]}`
  const TB = `{\\tiny [+T\\ ${formatNumber(state.tickSpeedAuto.value)}/s]}`

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
    return katex.renderToString(
      `N + ${currentFormula.value}`,
      {
        throwOnError: false,
        displayMode: true
      }
    )
  })