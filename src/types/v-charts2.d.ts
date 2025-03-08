// Type declarations for @v-charts2/histogram module
declare module '@v-charts2/histogram' {
  import type { DefineComponent } from 'vue'

  // Define more specific props interface if needed in the future
  interface HistogramProps {
    data?: Record<string, unknown>
    settings?: Record<string, unknown>
    legend?: Record<string, unknown>
    tooltip?: Record<string, unknown>
    [key: string]: unknown
  }

  const VeHistogram: DefineComponent<HistogramProps>
  export default VeHistogram
}

// Type declarations for css import
declare module '@v-charts2/histogram/v-charts.css' {
  const content: string
  export default content
}
