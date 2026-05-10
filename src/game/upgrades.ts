import { state } from "./state"
import { formatNumber } from './format';

export type Upgrade = {
  id: string
  name: string
  category: string
  symbol: string
  formula: number
  description: string
  cost: number
  level: number
  unlocked: boolean
  unlock: () => boolean
  display: () => string
  buy: () => void
}

export const upgrades: Upgrade[] = [
  {
    id: "addition",
    name: "Addition",
    category: "generation",
    symbol: "C",
    formula: state.manualPower.value,
    description: `+ 1`,
    cost: 10,
    level: 0,
    unlocked: true,

    unlock() {
      return true
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.manualPower.value += 1
        this.level += 1
        this.cost *= 1.65
      }
    }
  },

  {
    id: "passive-gen",
    name: "Passive Generation",
    category: "generation",
    symbol: "P",
    formula: state.passiveRate.value,
    description: `+ 0.15`,
    cost: 35,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 25
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.passiveRate.value += 0.15
        this.level += 1
        this.cost *= 1.85
      }
    }
  },

  {
    id: "tickspeed",
    name: "Tickspeed",
    category: "generation",
    symbol: "T",
    formula: state.tickSpeed.value,
    description: `+ 0.1`,
    cost: 150,
    level: 0,
    unlocked: false,

    unlock() {
      return state.passiveRate.value > 0
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.tickSpeed.value += 0.1
        this.level += 1
        this.cost *= 2.75
      }
    }
  },

  {
    id: "multiplication",
    name: "Multiplication",
    category: "generation",
    symbol: "M",
    formula: state.globalMultiplier.value,
    description: `+ 0.05`,
    cost: 500,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 250
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.globalMultiplier.value += 0.05
        this.level += 1
        this.cost *= 4.5
      }
    }
  },

  {
    id: "addition-buy",
    name: "Addition Auto-buyer",
    category: "automation",
    symbol: "+C",
    formula: state.manualPowerAuto.value,
    description: `+ 0.03`,
    cost: 1200,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1000
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.manualPowerAuto.value += 0.03
        this.level += 1
        this.cost *= 2.8
      }
    }
  },

  {
    id: "passive-buy",
    name: "Passive Generation Auto-buyer",
    category: "automation",
    symbol: "+P",
    formula: state.passiveRateAuto.value,
    description: `+ 0.01`,
    cost: 2500,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 1500 && state.passiveRate.value >0
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.passiveRateAuto.value += 0.01
        this.level += 1
        this.cost *= 3.25
      }
    }
  },

  {
    id: "tickspeed-buy",
    name: "Tickspeed Auto-buyer",
    category: "automation",
    symbol: "+T",
    formula: state.tickSpeedAuto.value,
    description: `+ 0.002`,
    cost: 6000,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 3000 && state.tickSpeed.value > 1
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.tickSpeedAuto.value += 0.002
        this.level += 1
        this.cost *= 4
      }
    }
  },

  {
    id: "multiplier-buy",
    name: "Multiplication Auto-buyer",
    category: "automation",
    symbol: "+M",
    formula: state.globalMultiplierAuto.value,
    description: `+ 0.001`,
    cost: 12000,
    level: 0,
    unlocked: false,

    unlock() {
      return state.numbers.value >= 5000 && state.globalMultiplier.value > 1
    },

    display() {
      return `${this.symbol} = ${formatNumber(this.formula)}`
    },

    buy() {
      if(state.numbers.value >= this.cost) {
        state.numbers.value -= this.cost
        state.globalMultiplierAuto.value += 0.001 
        this.level += 1
        this.cost *= 5.5
      }
    }
  },

]