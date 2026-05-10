<script setup lang="ts">

import type { Upgrade } from "../game/upgrades"

import UpgradeButton from "./UpgradeButton.vue"

defineProps<{
  title: string
  upgrades: Upgrade[]
  numbers: number
}>()

</script>

<template>

  <div class="systems-column">

    <div class="section-title">
      {{ title }}
    </div>

    <TransitionGroup
      name="upgrade-fade"
      tag="div"
      class="upgrade-list"
    >

      <UpgradeButton
        v-for="u in upgrades"
        :key="u.id"
        :upgrade="u"
        :canBuy="numbers >= u.cost"
      />

    </TransitionGroup>

  </div>

</template>

<style scoped>

.systems-column {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 12px;

  opacity: 0.6;

  letter-spacing: 4px;

  text-transform: uppercase;

  margin-bottom: 16px;

  border-bottom: 1px solid rgba(255,255,255,0.08);

  padding-bottom: 8px;
}

.upgrade-list {
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-top: 16px;
}

.upgrade-fade-enter-active,
.upgrade-fade-leave-active {
  transition: all 0.25s ease;
}

.upgrade-fade-enter-from,
.upgrade-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

</style>