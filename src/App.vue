<script setup lang="ts">

  import { saveGame, loadGame, startAutoSave } from "./game/save"

  import { computed, onMounted } from "vue"
  import "katex/dist/katex.min.css"

  import { state } from "./game/state"
  import { generateNumber, startGameLoop } from "./game/engine"
  import { upgrades } from "./game/upgrades"
  import type { Upgrade } from "./game/upgrades"

  import FormulaPanel from "./components/FormulaPanel.vue"
  import UpgradeColumn from "./components/UpgradeColumn.vue"
  import NumberDisplay from "./components/NumberDisplay.vue"

  import { playClickSound } from "./game/audio"

  async function handleGenerateNumber() {
    generateNumber()
    await playClickSound()
  }

  function isUnlocked(u: Upgrade) {
    if (!u.unlocked && u.unlock()) {
      u.unlocked = true
    }

    return u.unlocked
  }

  const generationUpgrades = computed(() => 
    upgrades.filter(
      u => 
        u.category === "generation" &&
        isUnlocked(u)
  ))

  const automationUpgrades = computed(() => 
    upgrades.filter(
      u => 
        u.category === "automation" &&
        isUnlocked(u)
  ))

  onMounted(() => {
    loadGame()
    startGameLoop()
    startAutoSave()
  })

</script>

<template>

  <main class="game">
    
    <FormulaPanel />

    <NumberDisplay />


    <button @click="handleGenerateNumber">
      Generate Number
    </button>

    <div class="save-controls">
      <button @click="saveGame">
        Save
      </button>

      <button @click="loadGame">
        Load
      </button>
    </div>
    
    <section class="systems-layout">

      <UpgradeColumn
        title="Generation Upgrades"
        :upgrades="generationUpgrades"
        :numbers="state.numbers.value"
      />

      <UpgradeColumn
        title="Automation Upgrades"
        :upgrades="automationUpgrades"
        :numbers="state.numbers.value"
      />

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

  .systems-layout {
    width: 100%;

    max-width: 1400px;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 48px;

    margin-top: 48px;
  }

  .dev-banner {
    position: fixed;
    top: 0;
    right: 0;

    background: red;
    color: white;

    padding: 6px 12px;

    font-size: 12px;

    z-index: 9999;
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

  .save-controls {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

</style>