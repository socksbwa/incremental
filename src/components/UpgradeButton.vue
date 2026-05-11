<script setup lang="ts">
import type { Upgrade } from "../game/upgrades"
import { formatNumber } from "../game/format"
import { playUpgradeSound } from "../game/audio"

const props = defineProps<{
  upgrade: Upgrade
  canBuy: boolean
}>()

async function handleBuy() {
  if (!props.canBuy) {
    return
  }

  props.upgrade.buy()

  await playUpgradeSound()
}
</script>

<template>

  <button
    class="upgrade-button"
    :disabled="!canBuy"
    @click="handleBuy"
  >

    <span class="upgrade-symbol">
      [{{ upgrade.symbol }}]
    </span>

    <span class="upgrade-info">
      <strong>{{ upgrade.name }}</strong>

      <small>
        {{ upgrade.display() }} {{ upgrade.description }} 
      </small>
    </span>

    <span class="upgrade-meta">
      {{ formatNumber(upgrade.cost) }} • Lv {{ upgrade.level }}
    </span>

  </button>

</template>

<style scoped>

.upgrade-button {
  user-select: none;
  display: grid;
  grid-template-columns: 60px 1fr auto;

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

.upgrade-button:not(:disabled) {
  border-color: rgba(120, 255, 160, 0.65);

  box-shadow: 0 0 12px rgba(120, 255, 160, 0.08);
}

.upgrade-button:disabled {
  opacity: 0.35;

  cursor: not-allowed;

  box-shadow: none;

  border-color: rgba(255, 255, 255, 0.08);

  color: rgba(255, 255, 255, 0.4);
}

.upgrade-info {
  min-width: 0;
}

.upgrade-meta {
  white-space: nowrap;
}

.upgrade-info strong {
  white-space: nowrap;
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

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

</style>