export function formatNumber(value: number): string {

  if (Number.isNaN(value)) {
    return "NaN"
  }

  if (!Number.isFinite(value)) {
    return "∞"
  }

  if (Math.abs(value) < 0.01 && value !== 0) {
    return value.toExponential(2)
  }

  if (value < 1000) {
    return value.toFixed(2)
  }

  const units = [
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No"
  ]

  let unitIndex = -1

  while (
    Math.abs(value) >= 1000 &&
    unitIndex < units.length - 1
  ) {
    value /= 1000
    unitIndex++
  }

  return `${value.toFixed(2)}${units[unitIndex]}`
}