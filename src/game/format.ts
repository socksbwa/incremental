export function formatNumber(value: number): string {

  if (Number.isNaN(value)) {
    return "NaN"
  }

  if (!Number.isFinite(value)) {
    return "∞"
  }

  function truncate(num: number, digits: number) {
    const factor = 10 ** digits

    return Math.trunc(num * factor) / factor
  }

  if (Math.abs(value) < 1 && value !== 0) {
    return truncate(value, 3).toString()
  }

  if (value < 100) {
    return truncate(value, 2).toString()
  }

  if (value < 1000) {
    return truncate(value, 1).toString()
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

  return `${truncate(value, 1)}${units[unitIndex]}`
}