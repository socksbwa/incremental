<script setup lang="ts">

import { renderedFormula } from "../game/formula"
</script>

<template>
  <section class="formula-panel">
    <div class="formula-title">
      Number Generation
    </div>

    <div v-html="renderedFormula"></div>
  </section>
</template>

<style scoped>
.formula-panel {
  border: 1px solid rgba(223, 255, 226, 0.25);
  padding: 16px 28px;
  margin-bottom: 40px;
  font-size: 24px;
  background: rgba(0, 255, 120, 0.04);
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
</style>