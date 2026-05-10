import { state } from "./state"

export type Upgrade = {
  id: string
  name: string
  category: string
  symbol: string
  description: string
  cost: number
  level: number
  unlocked: boolean
  unlock: () => boolean
  buy: () => void
}

export const upgrades: Upgrade[] = [
  {
    id: "addition",
    name: "Addition",
    category: "generation",
    symbol: "C",
    description: `+ 1`,
    cost: 1,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 5
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.manualPower.value += 1
        this.level += 1
        this.cost *= 2
      }
    }
  },

  {
    id: "passive-gen",
    name: "Passive Generation",
    category: "generation",
    symbol: "P",
    description: `+ 0.5`,
    cost: 2,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 50
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.passiveRate.value += 0.5
        this.level += 1
        this.cost *= 2.5
      }
    }
  },

  {
    id: "multiplication",
    name: "Multiplication",
    category: "generation",
    symbol: "M",
    description: `+ 0.25`,
    cost: 1,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 250
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.globalMultiplier.value += 0.25
        this.level += 1
        this.cost *= 4
      }
    }
  },

  {
    id: "tickspeed",
    name: "Tickspeed",
    category: "generation",
    symbol: "T",
    description: `+ 0.3`,
    cost: 1,
    level: 0,
    unlocked: false,

    unlock() {
      return state.passiveRate.value > 0
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.tickSpeed.value += 0.3
        this.level += 1
        this.cost *= 6
      }
    }
  },

  {
    id: "addition-buy",
    name: "Addition Auto-buyer",
    category: "automation",
    symbol: "+C",
    description: `+ 0.2`,
    cost: 2,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1000
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.manualPowerAuto.value += 0.2 
        this.level += 1
        this.cost *= 5
      }
    }
  },

  {
    id: "passive-buy",
    name: "Passive Generation Auto-buyer",
    category: "automation",
    symbol: "+P",
    description: `+ 0.1`,
    cost: 5,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1000
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.passiveRateAuto.value += 0.1
        this.level += 1
        this.cost *= 5
      }
    }
  },

  {
    id: "multiplier-buy",
    name: "Multiplication Auto-buyer",
    category: "automation",
    symbol: "+M",
    description: `+ 0.01`,
    cost: 1,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1000
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.globalMultiplierAuto.value += 0.01 
        this.level += 1
        this.cost *= 5
      }
    }
  },

  {
    id: "tickspeed-buy",
    name: "Tickspeed Auto-buyer",
    category: "automation",
    symbol: "+T",
    description: `+ 0.01`,
    cost: 1,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1000
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.tickSpeedAuto.value += 0.01 
        this.level += 1
        this.cost *= 5
      }
    }
  },

]