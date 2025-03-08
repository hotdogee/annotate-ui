declare module 'v-charts/lib/histogram.common' {
  import type { Component } from 'vue'
  const VeHistogram: Component
  export default VeHistogram
}

declare module 'numerify' {
  const numerify: (val: number, formatter: string) => string
  export default numerify
}

declare module 'utils-lite' {
  export function isFunction(val: unknown): val is (...args: unknown[]) => unknown
}
