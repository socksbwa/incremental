<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import { state } from "./game/state"
import { generateNumber, startGameLoop } from "./game/engine"
import { upgrades } from "./game/upgrades"
import type { Upgrade } from "./game/upgrades"
import {
  loadGame,
  startAutoSave,
  exportSaveFile,
  importSaveFile,
  resetGame
} from "./game/save"

import FormulaPanel from "./components/FormulaPanel.vue"
import UpgradeColumn from "./components/UpgradeColumn.vue"
import NumberDisplay from "./components/NumberDisplay.vue"
import MilestonePanel from "./components/MilestonePanel.vue"

const activeUpgradeTab = ref("generation")

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
  )
)

const automationUpgrades = computed(() =>
  upgrades.filter(
    u =>
      u.category === "automation" &&
      isUnlocked(u)
  )
)

const transformationUpgrades = computed(() =>
  upgrades.filter(
    u =>
      u.category === "transformation" &&
      isUnlocked(u)
  )
)

const visibleUpgradeTabs = computed(() => {
  const tabs = []

  if (generationUpgrades.value.length > 0) {
    tabs.push({
      id: "generation",
      title: "Generation",
      upgrades: generationUpgrades.value
    })
  }

  if (automationUpgrades.value.length > 0) {
    tabs.push({
      id: "automation",
      title: "Automation",
      upgrades: automationUpgrades.value
    })
  }

  if (transformationUpgrades.value.length > 0) {
    tabs.push({
      id: "transformation",
      title: "Transform",
      upgrades: transformationUpgrades.value
    })
  }

  return tabs
})

const activeUpgrades = computed(() => {
  const activeTab = visibleUpgradeTabs.value.find(
    tab => tab.id === activeUpgradeTab.value
  )

  if (activeTab) {
    return activeTab.upgrades
  }

  return visibleUpgradeTabs.value[0]?.upgrades ?? []
})

const activeTabTitle = computed(() => {
  const activeTab = visibleUpgradeTabs.value.find(
    tab => tab.id === activeUpgradeTab.value
  )

  return activeTab?.title ?? visibleUpgradeTabs.value[0]?.title ?? "Upgrades"
})

async function handleSaveFileLoad(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  await importSaveFile(file)

  input.value = ""
}

onMounted(() => {
  loadGame()
  startGameLoop()
  startAutoSave()
})
</script>

<template>
  <MilestonePanel />

  <main class="game">

  <MilestonePanel />

  <section class="center-panel">

    <FormulaPanel />

    <NumberDisplay />

    <button @click="generateNumber">
      Generate Number
    </button>

    <div class="save-controls">

      <button @click="exportSaveFile">
        Export Save
      </button>

      <label class="load-button">
        Import Save

        <input
          type="file"
          accept=".txt"
          hidden
          @change="handleSaveFileLoad"
        />
      </label>

      <button
        class="reset-button"
        @click="resetGame"
      >
        Reset Data
      </button>

    </div>

    <aside
      v-if="visibleUpgradeTabs.length > 0"
      class="upgrade-panel"
    >

      <div class="upgrade-tabs">

        <button
          v-for="tab in visibleUpgradeTabs"
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeUpgradeTab === tab.id }"
          @click="activeUpgradeTab = tab.id"
        >
          {{ tab.title }}
        </button>

      </div>

      <UpgradeColumn
        :title="activeTabTitle"
        :upgrades="activeUpgrades"
        :numbers="state.numbers.value"
      />

    </aside>

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
  justify-content: center;
  align-items: flex-start;

  padding: 48px;
}

.center-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upgrade-panel {
  position: fixed;

  top: 320px;
  left: 24px;

  width: 560px;

  max-height: calc(100vh - 340px);

  overflow-y: auto;

  border: 1px solid rgba(223, 255, 226, 0.12);

  background: rgba(5, 7, 10, 0.92);

  padding: 16px;

  backdrop-filter: blur(8px);
}

.upgrade-tabs {
  display: flex;

  gap: 8px;

  margin-bottom: 12px;
}

.tab-button {
  flex: 1;

  padding: 10px;

  font-size: 12px;
}

.tab-button.active {
  background: rgba(120, 255, 160, 0.14);

  border-color: rgba(120, 255, 160, 0.7);
}

.save-controls {
  display: flex;

  gap: 12px;

  margin-top: 16px;
}

.load-button {
  background: transparent;

  color: #dfffe2;

  border: 1px solid rgba(223, 255, 226, 0.4);

  padding: 16px 32px;

  font-family: Consolas, monospace;

  font-size: 18px;

  cursor: pointer;
}

.load-button:hover {
  background: rgba(120, 255, 160, 0.12);

  box-shadow: 0 0 20px rgba(120, 255, 160, 0.2);
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

.reset-button {
  border-color: rgba(255, 80, 80, 0.45);
}

.reset-button:hover {
  background: rgba(255, 80, 80, 0.12);

  box-shadow: 0 0 20px rgba(255, 80, 80, 0.2);
}
</style>
