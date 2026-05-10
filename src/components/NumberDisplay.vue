<script setup lang="ts">
import { state } from "../game/state"
import { formatNumber } from "../game/format"
</script>

<template>
  <div class="label">Numbers</div>

  <h1 class="main-number">
    {{ formatNumber(state.numbers.value) }}
  </h1>
</template>

<style scoped>
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

.main-number {
  user-select: none;
}
</style>