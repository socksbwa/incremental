<script setup lang="ts">
import { milestones, complexity } from "../game/progression"
</script>

<template>
  <section class="milestone-panel">
    <div class="section-title">
      Milestones
    </div>

    <div class="complexity">
      Complexity: {{ complexity }}
    </div>

    <div class="milestone-list">
      <div
      v-for="m in milestones"
      :key="m.id"
      class="milestone"
      :class="{
        complete: m.completed,
        claimed: m.claimed
      }"
      @click="m.claim()"
      >
        <span class="status">
          {{ m.claimed ? "◆" : m.completed ? "✓" : "○" }}
        </span>

        <div>
          <strong>{{ m.title }}</strong>
          <small>{{ m.description }}</small>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.milestone.complete {
  cursor: pointer;
}

.milestone.claimed {
  opacity: 0.75;
  border-color: rgba(120, 180, 255, 0.45);
}

.complexity {
  font-size: 11px;
  opacity: 0.8;
  margin-bottom: 10px;
}
.milestone-panel {
  position: fixed;

  top: 24px;
  right: 24px;

  width: 280px;

  border: 1px solid rgba(223, 255, 226, 0.12);

  background: rgba(5, 7, 10, 0.92);

  padding: 14px;

  backdrop-filter: blur(8px);

  z-index: 1000;
}

.section-title {
  font-size: 10px;

  opacity: 0.55;

  letter-spacing: 3px;

  text-transform: uppercase;

  margin-bottom: 10px;

  border-bottom: 1px solid rgba(255,255,255,0.08);

  padding-bottom: 6px;
}

.milestone-list {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.milestone {
  display: flex;

  gap: 10px;

  align-items: flex-start;

  border: 1px solid rgba(223, 255, 226, 0.08);

  background: rgba(255,255,255,0.02);

  padding: 8px 10px;

  opacity: 0.4;

  font-size: 12px;
}

.milestone.complete {
  opacity: 1;

  border-color: rgba(120, 255, 160, 0.4);

  box-shadow: 0 0 10px rgba(120,255,160,0.06);
}

.status {
  font-size: 14px;

  margin-top: 1px;
}

.milestone small {
  display: block;

  opacity: 0.6;

  margin-top: 2px;

  font-size: 10px;
}
</style>