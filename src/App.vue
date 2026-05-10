<script setup lang="ts">

  import { computed } from "vue"
  import katex from "katex"
  import "katex/dist/katex.min.css"

  import { state } from "./game/state"
  import { generateNumber, startGameLoop } from './game/engine';
  import { upgrades } from './game/upgrades';

  const currentFormula = computed(() => {

    const C = `{C}{\\scriptsize[${state.manualPower.value.toFixed(2)}]}`
    const P = `{P}{\\scriptsize[${state.passiveRate.value.toFixed(2)}]}`
    const M = `{M}{\\scriptsize[${state.globalMultiplier.value.toFixed(2)}]}`
    const T = `{T}{\\scriptsize[${state.tickSpeed.value.toFixed(2)}]}`

    const CB = `{\\scriptsize[C+}{\\scriptsize${state.manualPowerAuto.value.toFixed(2)}]}`
    const PB = `{\\scriptsize[P+}{\\scriptsize${state.passiveRateAuto.value.toFixed(2)}]}`
    const MB = `{\\scriptsize[M+}{\\scriptsize${state.globalMultiplierAuto.value.toFixed(2)}]}`
    const TB = `{\\scriptsize[T+}{\\scriptsize${state.tickSpeedAuto.value.toFixed(2)}]}`

    
    let clickTerm = C

    if (state.manualPowerAuto.value > 0) {
      clickTerm = `(${clickTerm} + ${CB})`
    }

    let formula = clickTerm

    if (state.passiveRate.value > 0.01) {
      let passiveTerm = P

      if (state.tickSpeed.value > 1) {
        passiveTerm = `${passiveTerm}${T}`
      }

      if (state.passiveRateAuto.value > 0) {
        passiveTerm = `(${passiveTerm} + ${PB})`
      }

      if (state.tickSpeedAuto.value > 0) {
        passiveTerm = `(${passiveTerm} + ${TB})`
      }

      formula = `(${formula} + ${passiveTerm})`
    }

    if (state.globalMultiplier.value > 1) {
      let multiplierTerm = M

      if (state.globalMultiplierAuto.value > 0) {
        multiplierTerm = `(${multiplierTerm} + ${MB})`
      }

      formula = `${formula}${multiplierTerm}`
    }

    return formula
  })

  const renderedFormula = computed(() => {
    return katex.renderToString(`N + ${currentFormula.value}`, {
      throwOnError: false,
      displayMode: true
    })
  })

  const generationUpgrades = computed(() => 
    upgrades.filter(u => u.category === "generation")
  )

  const automationUpgrades = computed(() => 
    upgrades.filter(u => u.category === "automation")
  )

  startGameLoop()

</script>

<template>

  <main class="game">
    
    <section class="formula-panel">
      
      <div class="formula-title">
        Number Generation
      </div>

      <div  v-html="renderedFormula"></div>
    </section>

    <div class="label">Numbers</div>

    <h1 class="main-number">
      {{ state.numbers.value.toFixed(2) }}
    </h1>


    <button @click="generateNumber">
      Generate Number
    </button>
    
    <section class="systems-layout">

      <div class="systems-column">

        <div class="section-title">
          Generation Upgrades
        </div>

        <div class="upgrade-list">

          <button
            v-for="u in generationUpgrades"
            :key="u.id"
            class="upgrade-button"
            :disabled="state.numbers.value < u.cost"
            @click="u.buy()"
          >

            <span class="upgrade-symbol">
              [{{ u.symbol }}]
            </span>

            <span class="upgrade-info">
              <strong>{{ u.name }}</strong>
              <small>{{ u.description }}</small>
            </span>

            <span class="upgrade-meta">
              Cost: {{ u.cost.toFixed(2) }} | Lv: {{ u.level }}
            </span>

          </button>

        </div>

      </div>

      <div class="systems-column">

        <div class="section-title">
          Automation Upgrades
        </div>

        <div class="upgrade-list">

          <button
            v-for="u in automationUpgrades"
            :key="u.id"
            class="upgrade-button"
            :disabled="state.numbers.value < u.cost"
            @click="u.buy()"
          >

            <span class="upgrade-symbol">
              [{{ u.symbol }}]
            </span>

            <span class="upgrade-info">
              <strong>{{ u.name }}</strong>
              <small>{{ u.description }}</small>
            </span>

            <span class="upgrade-meta">
              Cost: {{ u.cost.toFixed(2) }} | Lv: {{ u.level }}
            </span>

          </button>

        </div>
      
        </div>

    </section>

  </main>

</template>

<style scoped>

  .game {
    min-height: 100vh;
    background:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
      #05070a;

    background-size: 40px 40px;

    color: #dfffe2;

    font-family: Consolas, monospace;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 48px;
  }

  .formula-panel {
    border: 1px solid rgba(223, 255, 226, 0.25);

    padding: 16px 28px;

    margin-bottom: 40px;

    font-size: 24px;

    background: rgba(0, 255, 120, 0.04);
  }

  .main-number {
    font-size: 72px;

    letter-spacing: 2px;

    text-shadow: 0 0 18px rgba(120, 255, 160, 0.5);

    margin-bottom: 12px;
  }

  .label {
    opacity: 0.65;

    font-size: 14px;

    text-transform: uppercase;

    letter-spacing: 3px;
  }

  .stats {
    display: flex;

    gap: 16px;

    margin: 32px 0;
  }

  .stat-card {
    border: 1px solid rgba(223, 255, 226, 0.18);

    padding: 14px 20px;

    min-width: 160px;

    background: rgba(255,255,255,0.03);
  }

  .upgrade-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;
  }

  .upgrade-button {
    display: grid;
    grid-template-columns: 70px 1fr auto;
    align-items: center;
    gap: 16px;
    text-align: left;
  }

  .upgrade-symbol {
    font-size: 24px;
    opacity: 0.9;
  }

  .upgrade-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .upgrade-info small {
    opacity: 0.65;
  }

  .upgrade-meta {
    opacity: 0.75;
    font-size: 14px;
  }

  .upgrade-button:disabled {
    opacity: 0.35;

    cursor: not-allowed;

    box-shadow: none;

    transform: none;
  }

  .formula-title {
    opacity: 0.65;

    font-size: 12px;

    letter-spacing: 4px;

    text-transform: uppercase;

    margin-bottom: 12px;

    border-bottom: 1px solid rgba(255,255,255,0.08);

    padding-bottom: 8px;
  }

  .systems-layout {
    width: 100%;

    max-width: 1400px;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 48px;

    margin-top: 48px;
  }

.systems-column {
  display: flex;

  flex-direction: column;
}

  button {
    background: transparent;

    color: #dfffe2;

    border: 1px solid rgba(223, 255, 226, 0.4);

    padding: 16px 32px;

    font-family: Consolas, monospace;

    font-size: 18px;

    cursor: pointer;
  }

  button:hover {
    background: rgba(120, 255, 160, 0.12);

    box-shadow: 0 0 20px rgba(120, 255, 160, 0.2);
  }

</style>