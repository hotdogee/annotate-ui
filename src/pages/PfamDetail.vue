<template>
  <q-page padding>
    <!-- Header section -->
    <div class="header-section q-pb-sm">
      <div class="text-h4 text-primary">Pfam Domain Prediction Results</div>
      <q-separator class="q-mb-md" />
      <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <div class="text-h6 text-weight-medium">{{ seqHeader }}</div>
          <div class="text-subtitle1 q-mt-sm">
            Sequence Length: <span class="text-weight-medium">{{ seqLength }}</span> amino acids
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Chart section -->
    <div class="chart-section q-pb-sm">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">Domain Distribution Visualization</div>
          <div class="chart-container">
            <div
              v-if="isChartDataValid"
              ref="echartsContainer"
              :key="forceRender"
              class="chart-area"
            ></div>
            <div v-else class="error-container">
              <q-banner rounded class="bg-grey-2">
                <template v-slot:avatar>
                  <q-icon name="error" color="warning" size="md" />
                </template>
                <div class="text-subtitle1">Unable to display domain visualization chart</div>
                <div class="q-mt-sm" v-if="chartError">
                  <span class="text-caption">Error details: {{ chartError }}</span>
                </div>
                <div class="q-mt-sm">
                  <span class="text-caption"
                    >You can still view the domain data in the tables below.</span
                  >
                </div>
              </q-banner>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Prediction Results Table -->
    <div class="tables-section">
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-primary q-pb-md">
            {{ pfamTableTitle || 'Predicted Domains' }}
          </div>
          <q-table
            :rows="pfamTableData"
            :columns="pfamTableColumns"
            v-model:pagination="pagination"
            row-key="start"
            flat
            bordered
            class="rounded-borders"
          >
            <template #body-cell-pfamAcc="props">
              <q-td :props="props">
                <q-btn
                  icon-right="open_in_new"
                  :label="props.value"
                  color="secondary"
                  flat
                  dense
                  class="text-weight-medium"
                  @click="familyLink(props.value)"
                ></q-btn>
              </q-td>
            </template>
            <template #body-cell-clanAcc="props">
              <q-td :props="props">
                <q-btn
                  icon-right="open_in_new"
                  :label="props.value"
                  color="secondary"
                  flat
                  dense
                  class="text-weight-medium"
                  @click="clanLink(props.value)"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <!-- Reference Data Tables -->
      <template v-if="pfam32ReferenceData.length > 0 || pfam31ReferenceData.length > 0">
        <div class="text-h6 text-primary q-pb-md">Reference Data</div>

        <q-card v-if="pfam32ReferenceData.length > 0" flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium q-pb-md">Pfam32 Reference Data</div>
            <q-table
              :rows="pfam32ReferenceData"
              :columns="pfamReferenceColumns"
              v-model:pagination="pagination"
              row-key="start"
              flat
              bordered
              class="rounded-borders"
            >
              <!-- Reuse the same templates as above -->
              <template #body-cell-pfamAcc="props">
                <q-td :props="props">
                  <q-btn
                    icon-right="open_in_new"
                    :label="props.value"
                    color="secondary"
                    flat
                    dense
                    class="text-weight-medium"
                    @click="familyLink(props.value)"
                  ></q-btn>
                </q-td>
              </template>
              <template #body-cell-clanAcc="props">
                <q-td :props="props">
                  <q-btn
                    icon-right="open_in_new"
                    :label="props.value"
                    color="secondary"
                    flat
                    dense
                    class="text-weight-medium"
                    @click="clanLink(props.value)"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>

        <q-card v-if="pfam31ReferenceData.length > 0" flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium q-pb-md">Pfam31 Reference Data</div>
            <q-table
              :rows="pfam31ReferenceData"
              :columns="pfamReferenceColumns"
              v-model:pagination="pagination"
              row-key="start"
              flat
              bordered
              class="rounded-borders"
            >
              <!-- Reuse the same templates as above -->
              <template #body-cell-pfamAcc="props">
                <q-td :props="props">
                  <q-btn
                    icon-right="open_in_new"
                    :label="props.value"
                    color="secondary"
                    flat
                    dense
                    class="text-weight-medium"
                    @click="familyLink(props.value)"
                  ></q-btn>
                </q-td>
              </template>
              <template #body-cell-clanAcc="props">
                <q-td :props="props">
                  <q-btn
                    icon-right="open_in_new"
                    :label="props.value"
                    color="secondary"
                    flat
                    dense
                    class="text-weight-medium"
                    @click="clanLink(props.value)"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<style lang="scss">
.header-section {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-section {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

.chart-container {
  position: relative;
  min-height: 400px;
}

.chart-area {
  width: 100%;
  height: 400px;
  transition: all 0.3s ease;
}

.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 1rem;
}

.tables-section {
  max-width: 1200px;
  margin: 0 auto;

  .q-table {
    background: white;

    thead tr th {
      font-weight: 500;
      color: #205b13;
    }

    tbody tr:hover {
      background: rgba(32, 91, 19, 0.05);
    }
  }

  .q-card {
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }
}

// Keep existing script section...
</style>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { openURL } from 'quasar'
import { pfam, references } from 'src/boot/feathers'
import { defineQuery, useQuery } from '@pinia/colada'
import * as echarts from 'echarts'
// Types

interface TableRow {
  start: number
  end: number
  pfamAcc: string
  pfamId: string
  clanAcc: string
  clanId: string
  pfamDesc: string
  score?: string
  class?: number | string
}

interface TableColumn {
  name: string
  label: string
  field: string
  sortable?: boolean
}

interface ChartData {
  columns: string[]
  rows: Record<string, string | number>[]
}

// Component setup
const route = useRoute()

const chartError = ref<string | null>(null)
const forceRender = ref(0) // Add a key to force component re-render

// Watch for route changes to handle navigation
watch(
  () => route.params.id,
  () => {
    // Force chart re-render when route changes
    forceRender.value++
    // Clean up old chart instance
    if (echartsInstance) {
      echartsInstance.dispose()
      echartsInstance = null
    }
    // Initialize new chart after a short delay to ensure DOM is ready
    setTimeout(() => {
      renderEcharts()
    }, 100)
  },
)

const pfamTableTitle = ref('')
const pagination = ref({
  rowsPerPage: 10,
})

const pfamTableColumns = ref<TableColumn[]>([
  { name: 'start', label: 'Start', field: 'start', sortable: true },
  { name: 'end', label: 'End', field: 'end', sortable: true },
  { name: 'pfamAcc', label: 'Pfam accession', field: 'pfamAcc', sortable: true },
  { name: 'pfamId', label: 'Pfam ID', field: 'pfamId', sortable: true },
  { name: 'clanAcc', label: 'Clan accession', field: 'clanAcc', sortable: true },
  { name: 'clanId', label: 'Clan ID', field: 'clanId', sortable: true },
  { name: 'pfamDesc', label: 'Pfam description', field: 'pfamDesc', sortable: false },
])

const pfamReferenceColumns = ref<TableColumn[]>([
  { name: 'start', label: 'Start', field: 'start', sortable: true },
  { name: 'end', label: 'End', field: 'end', sortable: true },
  { name: 'pfamAcc', label: 'Pfam accession', field: 'pfamAcc', sortable: true },
  { name: 'pfamId', label: 'Pfam ID', field: 'pfamId', sortable: true },
  { name: 'clanAcc', label: 'Clan accession', field: 'clanAcc', sortable: true },
  { name: 'clanId', label: 'Clan ID', field: 'clanId', sortable: true },
  { name: 'pfamDesc', label: 'Pfam description', field: 'pfamDesc', sortable: false },
])

const pfam31ReferenceData = ref<TableRow[]>([])
const pfam32ReferenceData = ref<TableRow[]>([])

interface DomainMap {
  [key: string]: {
    pfamAcc: string
    pfamId: string
    clanAcc: string
    clanId: string
    pfamDesc: string
  }
}

interface Prediction {
  classes: number[]
  top_classes: number[][]
  top_probs: number[][]
}

interface Current {
  _id: string
  domainMap: DomainMap
  header: string
  predictions: Prediction
  sequence: string
}
// Data
const current = ref<Current>({
  _id: '',
  domainMap: {},
  header: '',
  predictions: {
    classes: [],
    top_classes: [],
    top_probs: [],
  },
  sequence: '',
})

// Computed properties
const seqHeader = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return current.value.header
  }
})

const seqLength = computed((): number | string => {
  if (!current.value) {
    return ''
  } else {
    return current.value.sequence.length
  }
})

// These computed properties are used in the commented-out inputs in the template
// Keeping them for potential future use
/*
const pfamClasses = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions.classes, null, '')
  }
})

const pfamTopClasses = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions.top_classes, null, '')
  }
})

const pfamTopProbs = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions.top_probs, null, '')
  }
})

const pfamDomainMap = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.domainMap, null, '')
  }
})
*/

const domainScores = computed((): Record<string, number> => {
  if (!current.value) {
    return {}
  } else {
    const predictions = current.value.predictions
    if (!predictions) return {}

    const probs = predictions.top_probs.flat()
    const counts: Record<string, number[]> = predictions.top_classes
      .flat()
      .reduce((a: Record<string, number[]>, c: number, i: number) => {
        const key = c.toString()
        if (!Array.isArray(a[key])) {
          a[key] = []
        }
        a[key].push(probs[i] ?? 0)
        return a
      }, {})

    const arrAvg = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length
    const scores: Record<string, number> = Object.keys(counts).reduce(
      (a: Record<string, number>, c: string) => {
        if (c === '1') {
          a[c] = 200
        } else {
          a[c] = arrAvg(counts[c] ?? []) * 100
        }
        return a
      },
      {},
    )
    return scores
  }
})

const labelMap = computed((): Record<string, string> => {
  if (!current.value) {
    return {}
  } else {
    const scores = domainScores.value
    return Object.keys(scores)
      .sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
      .reduce((a: Record<string, string>, c: string) => {
        const domain = current.value.domainMap[c]
        if (c === '1' && domain) {
          a[domain.pfamId] = domain.pfamId
        } else if (domain) {
          a[domain.pfamId] = `${domain.pfamId}(${(scores[c] ?? 0).toFixed(1)})`
        }
        return a
      }, {})
  }
})

const sortedDomains = computed((): string[] => {
  if (!current.value) {
    return []
  } else {
    return Object.keys(labelMap.value)
  }
})

// Add a new method for handling chart errors
const handleChartError = (err: unknown, context: string) => {
  console.error(`Error in ${context}:`, err)
  chartError.value = err instanceof Error ? err.message : `Error in ${context}`
}

// Update the computed properties to avoid side effects
const pfamChartData = computed((): ChartData => {
  try {
    if (!current.value) {
      return { columns: [], rows: [] }
    } else {
      const predictions = current.value.predictions
      if (!predictions) return { columns: [], rows: [] }

      const aaKey = 'aa'
      const rows = current.value.sequence.split('').map((v: string, i: number) => {
        const row: Record<string, string | number> = (predictions.top_classes[i] ?? []).reduce(
          (a: Record<string, number>, c: number, ii: number) => {
            if (c && current.value.domainMap[c]) {
              const pfamId = current.value.domainMap[c].pfamId
              a[pfamId] = predictions.top_probs[i]?.[ii] ?? 0
              if (c === 1 && a[pfamId] !== undefined) {
                a[pfamId] *= -1
              }
            }
            return a
          },
          {},
        )
        row[aaKey] = v
        return row
      })

      return {
        columns: [aaKey].concat(sortedDomains.value),
        rows,
      }
    }
  } catch (err) {
    // Log error but don't modify state in computed
    console.error('Error creating chart data:', err)
    return { columns: [], rows: [] }
  }
})

const pfamChartSettings = computed(() => {
  try {
    if (!current.value) {
      return {
        stack: { domains: [] },
        yAxisType: ['percent'],
        yAxisName: ['Probability'],
        max: [1],
        min: [-1],
        digit: 2,
        labelMap: {},
      }
    } else {
      // Make sure sortedDomains exists and has values
      const domains = sortedDomains.value || []
      const labelMapValue = labelMap.value || {}

      return {
        stack: { domains: domains },
        yAxisType: ['percent'],
        yAxisName: ['Probability'],
        max: [1],
        min: [-1],
        digit: 2,
        labelMap: labelMapValue,
      }
    }
  } catch (err) {
    // Log error but don't modify state in computed
    console.error('Error creating chart settings:', err)
    return {}
  }
})

const pfamTableData = computed((): TableRow[] => {
  if (!current.value) {
    return []
  } else {
    const predictions = current.value.predictions
    if (!predictions) return []

    const PROB_MINIMUM = 0.008
    const SCORE_THRESHOLD = 0.5
    const domainThresholds = Object.keys(domainScores.value).reduce(
      (a: Record<string, number>, c: string) => {
        const score = domainScores.value[c] ?? 0
        if (score > 100 || score < PROB_MINIMUM * 100) {
          a[c] = 999
        } else if (score > 50) {
          a[c] = 0.5
        } else {
          a[c] = (score * SCORE_THRESHOLD) / 100
        }
        return a
      },
      {},
    )

    const LINK_THRESHOLD = 4 // gap of 0, 1, 2, 3 will be linked
    const MIN_REGION_LENGTH = 4
    const topClasses = predictions.top_classes
    const topProbs = predictions.top_probs

    return topClasses
      .reduce((a: number[], classes: number[], i: number) => {
        const c1 = classes[0] ?? 1 // Default to 1 if not present
        const c2 = classes[1]
        const p2 = topProbs[i]?.[1]
        // start condition: prob over threshold
        let c = c1
        if (
          c1 === 1 &&
          c2 !== undefined &&
          p2 !== undefined &&
          p2 > (domainThresholds[c2.toString()] ?? 0)
        ) {
          c = c2
        }
        a[i] = c
        return a
      }, [])
      .reduce((a: TableRow[], c: number, i: number) => {
        const recentRegion = a.slice(-1)[0]
        if (!recentRegion && c !== 1 && current.value.domainMap[c]) {
          // first region
          a.push({
            start: i + 1, // 1-indexed
            end: i + 1,
            pfamAcc: current.value.domainMap[c].pfamAcc,
            pfamId: current.value.domainMap[c].pfamId,
            clanAcc: current.value.domainMap[c].clanAcc,
            clanId: current.value.domainMap[c].clanId,
            pfamDesc: current.value.domainMap[c].pfamDesc,
            score: domainScores.value[c]?.toFixed(1) ?? '0.0',
            class: c,
          })
        } else if (!!recentRegion && c === recentRegion.class && current.value.domainMap[c]) {
          if (i - recentRegion.end < LINK_THRESHOLD) {
            recentRegion.end = i + 1
          } else {
            a.push({
              start: i + 1, // 1-indexed
              end: i + 1,
              pfamAcc: current.value.domainMap[c].pfamAcc,
              pfamId: current.value.domainMap[c].pfamId,
              clanAcc: current.value.domainMap[c].clanAcc,
              clanId: current.value.domainMap[c].clanId,
              pfamDesc: current.value.domainMap[c].pfamDesc,
              score: domainScores.value[c]?.toFixed(1) ?? '0.0',
              class: c,
            })
          }
        } else if (
          !!recentRegion &&
          c !== 1 &&
          c !== recentRegion.class &&
          current.value.domainMap[c]
        ) {
          a.push({
            start: i + 1, // 1-indexed
            end: i + 1,
            pfamAcc: current.value.domainMap[c].pfamAcc,
            pfamId: current.value.domainMap[c].pfamId,
            clanAcc: current.value.domainMap[c].clanAcc,
            clanId: current.value.domainMap[c].clanId,
            pfamDesc: current.value.domainMap[c].pfamDesc,
            score: domainScores.value[c]?.toFixed(1) ?? '0.0',
            class: c,
          })
        }
        return a
      }, [])
      .filter((row: TableRow) => row.end - row.start > MIN_REGION_LENGTH - 2)
  }
})

const uniprotRe =
  /^>(?<database>[a-z]+)\|(?<accession>[A-Z0-9]+)\|(?<entry_name>[A-Z0-9]+_[A-Z0-9]+) (?<description>.*?)(?: OS=(?<organism>.*?))?(?: GN=(?<gene>.*?))?(?: PE=(?<protein_existence>\d))?(?: SV=(?<sequence_version>\d+))?$/

const uniprotAcc = computed((): string => {
  const header = current.value?.header
  if (!header || header.startsWith('>PROTEIN_')) return ''

  let match = header.match(uniprotRe)
  if (match?.groups?.accession) {
    console.log('match.groups.accession', match.groups.accession)
    return `${match.groups.accession}.${match.groups.sequence_version ?? 1}`
  }

  match = header.match(/^>(?<accession>\w+)(?:\.(?<sequence_version>\d+))?/)
  if (match?.groups?.accession) {
    return `${match.groups.accession}.${match.groups.sequence_version ?? 1}`
  }
  return ''
})

// Methods
const familyLink = (pfamAcc: string): void => {
  openURL(`http://pfam.xfam.org/family/${pfamAcc}`)
}

const clanLink = (clanAcc: string): void => {
  openURL(`http://pfam.xfam.org/clan/${clanAcc}`)
}

const useReferenceData = defineQuery(() => {
  const { data: referenceData, ...rest } = useQuery({
    staleTime: Infinity,
    key: () => ['references', uniprotAcc.value],
    query: async () => {
      // check local storage
      if (!uniprotAcc.value) {
        return { data: [] }
      }
      console.log(`Fetching references for ${uniprotAcc.value}`)
      const cachedData = localStorage.getItem(`references-${uniprotAcc.value}`)
      if (cachedData) {
        return JSON.parse(cachedData)
      }
      const result = await references.find({ query: { seqAcc: uniprotAcc.value } })
      localStorage.setItem(`references-${uniprotAcc.value}`, JSON.stringify(result))
      return result
    },
  })
  return { ...rest, referenceData }
})
const { referenceData } = useReferenceData()
watch(
  () => referenceData.value,
  (newVal) => {
    console.log('referenceData watcher', newVal)
    try {
      interface ReferenceData {
        refName: string
        start: number
        end: number
        [key: string]: unknown
      }
      if (Array.isArray(newVal?.data)) {
        pfam32ReferenceData.value = newVal.data
          .filter((r: ReferenceData) => r.refName === 'pfam32')
          .sort((a: ReferenceData, b: ReferenceData) => a.start - b.start)
        pfam31ReferenceData.value = newVal.data
          .filter((r: ReferenceData) => r.refName === 'pfam31')
          .sort((a: ReferenceData, b: ReferenceData) => a.start - b.start)
      }
    } catch (err) {
      handleChartError(err, 'pfam32 reference data update')
    }
  },
)

// Add watchers for chart data to catch potential errors
watch(
  () => current.value,
  (newVal) => {
    console.log('current watcher', current.value)
    try {
      // Reset chart error when new data is loaded
      chartError.value = null
      // Basic validation
      if (!newVal || !newVal.sequence || !newVal.predictions) {
        chartError.value = 'Incomplete data for chart rendering'
      }
    } catch (err) {
      handleChartError(err, 'data update')
    }
  },
)

const { data: pfamData, isLoading } = useQuery({
  staleTime: Infinity,
  key: () => ['pfam', route.params.id as string],
  query: async () => {
    // check local storage
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    console.log(`Fetching Pfam data for ${id}`)
    if (!id) {
      throw new Error('ID is undefined')
    }
    const cachedData = localStorage.getItem(`pfam-${id}`)
    if (cachedData) {
      return JSON.parse(cachedData)
    }
    const result = await pfam.get(id)
    localStorage.setItem(`pfam-${id}`, JSON.stringify(result))
    return result
  },
})

if (pfamData.value) {
  current.value = pfamData.value
} else {
  current.value = {
    _id: '',
    domainMap: {},
    header: '',
    predictions: {
      classes: [],
      top_classes: [],
      top_probs: [],
    },
    sequence: '',
  }
}

watch(
  () => pfamData.value,
  (newVal) => {
    console.log('pfamData watcher', newVal)
    try {
      if (newVal) {
        current.value = newVal
      } else {
        current.value = {
          _id: '',
          domainMap: {},
          header: '',
          predictions: {
            classes: [],
            top_classes: [],
            top_probs: [],
          },
          sequence: '',
        }
      }
    } catch (err) {
      handleChartError(err, 'pfam data update')
    }
  },
)

// Add debounced watcher for chart data to validate it before rendering
const validateChartData = () => {
  try {
    // Access the computed properties to validate them
    const chartData = pfamChartData.value
    const chartSettings = pfamChartSettings.value

    if (!chartData || !chartData.columns || !chartData.rows || chartData.rows.length === 0) {
      chartError.value = 'Invalid chart data structure'
      return false
    }

    if (!chartSettings || !chartSettings.stack || !chartSettings.yAxisType) {
      chartError.value = 'Invalid chart settings'
      return false
    }

    // Check for domain map consistency
    const domains = sortedDomains.value
    if (domains.length === 0 && current.value && current.value.sequence) {
      chartError.value = 'No domains found to display'
      return false
    }

    return true
  } catch (err) {
    handleChartError(err, 'chart validation')
    return false
  }
}

watch([() => pfamChartData.value, () => pfamChartSettings.value], () => {
  // Use setTimeout to ensure this runs after the Vue reactivity system has settled
  setTimeout(validateChartData, 0)
})

// Update isChartDataValid to call error handler when appropriate
const isChartDataValid = computed((): boolean => {
  try {
    if (!current.value || !current.value.sequence || !current.value.predictions) {
      return false
    }

    // Ensure we have valid chart data structure
    const data = pfamChartData.value
    if (!data || !data.columns || !data.rows || !data.columns.length || !data.rows.length) {
      return false
    }

    // Ensure settings are valid
    const settings = pfamChartSettings.value
    if (!settings || !settings.stack || !settings.yAxisType || !settings.yAxisName) {
      return false
    }

    // Check for domain map consistency
    const domains = sortedDomains.value
    if (domains.length === 0 && current.value && current.value.sequence) {
      return false
    }

    if (isLoading.value) {
      return false
    }

    return true
  } catch (err) {
    handleChartError(err, 'chart data validation')
    return false
  }
})

// ECharts setup
const echartsContainer = ref<HTMLElement | null>(null)
let echartsInstance: echarts.ECharts | null = null

// Define interfaces for ECharts parameters
interface EChartsTooltipParam {
  dataIndex: number
  seriesName: string
  value: number
  color: string
  name?: string
}

// Convert v-charts settings to echarts format
const getEchartsOptions = () => {
  try {
    if (!isChartDataValid.value) {
      return null
    }

    const chartData = pfamChartData.value
    // Use chartSettings directly from computed property instead
    const domains = sortedDomains.value

    // Generate series for each domain
    const series = domains.map((domain) => {
      return {
        name: labelMap.value[domain] || domain,
        type: 'bar',
        stack: 'domains',
        data: chartData.rows.map((row) => row[domain]),
      }
    })

    // Helper functions
    const itemPoint = (color: string): string => {
      return [
        '<span style="',
        `background-color:${color};`,
        'display: inline-block;',
        'width: 10px;',
        'height: 10px;',
        'border-radius: 50%;',
        'margin-right:2px;',
        '"></span>',
      ].join('')
    }

    // Create tooltip formatter similar to the one in v-charts
    const tooltipFormatter = (params: EChartsTooltipParam | EChartsTooltipParam[]) => {
      // console.log('tooltipFormatter', params)
      const tpl: string[] = []
      // Convert to array if it's a single item
      const paramsArray = Array.isArray(params) ? params : [params]

      if (paramsArray.length > 0 && paramsArray[0]) {
        // Position in sequence (1-indexed)
        const position = paramsArray[0].dataIndex + 1
        // Show amino acid at this position
        const aa = chartData.rows[paramsArray[0].dataIndex]?.aa
        tpl.push(`${position}: ${aa}<br>`)

        // Sort items by absolute value like in original chart
        paramsArray
          .sort((a, b) => Math.abs(b.value || 0) - Math.abs(a.value || 0))
          .forEach((item) => {
            // console.log(`item ${i}`, item)
            if (isNaN(item.value)) return
            // console.log(`isNaN ${i}`, item)
            const seriesName = item.seriesName
            const value = item.value
            tpl.push(itemPoint(item.color))
            tpl.push(`${seriesName}: `)
            // Format as percentage with 2 decimal places
            tpl.push(`${(value * 100).toFixed(2)}%`)
            tpl.push('<br>')
          })
      }
      return tpl.join('')
    }

    const option = {
      tooltip: {
        trigger: 'axis' as const,
        axisPointer: {
          type: 'shadow' as const,
        },
        formatter: tooltipFormatter,
      },
      legend: {
        type: 'scroll' as const,
        align: 'left' as const,
        left: 10,
        data: domains.map((domain) => labelMap.value[domain] || domain),
      },
      grid: {
        containLabel: true,
        left: 20,
        right: 20,
        bottom: 20,
      },
      xAxis: {
        type: 'category' as const,
        data: chartData.rows.map((row) => row.aa as string), // Show amino acids like in original chart
        silent: false,
        axisLabel: {
          show: true,
        },
        axisTick: { alignWithLabel: true },
      },
      yAxis: {
        type: 'value' as const,
        min: -1,
        max: 1,
        axisLabel: {
          formatter: (value: number) => {
            // Format as percent
            return `${Math.abs(value * 100)}%`
          },
        },
        name: 'Probability',
      },
      series: series,
      // animation: false, // Disable animation for better performance with large datasets
      color: [
        '#19d4ae',
        '#5ab1ef',
        '#fa6e86',
        '#ffb980',
        '#0067a6',
        '#c4b4e4',
        '#d87a80',
        '#9cbbff',
        '#d9d0c7',
        '#87a997',
        '#d49ea2',
        '#5b4947',
        '#7ba3a8',
      ],
    }

    return option
  } catch (err) {
    handleChartError(err, 'echarts option generation')
    return null
  }
}

const renderEcharts = () => {
  try {
    if (!echartsContainer.value || !isChartDataValid.value) return

    if (!echartsInstance) {
      // Initialize chart
      echartsInstance = echarts.init(echartsContainer.value)

      // Handle resize
      const resizeHandler = () => {
        echartsInstance?.resize()
      }
      window.addEventListener('resize', resizeHandler)
    }

    const option = getEchartsOptions()
    if (option) {
      echartsInstance.setOption(option, true) // Use true to clear previous options
    }
  } catch (err) {
    handleChartError(err, 'echarts rendering')
  }
}

// Setup and cleanup for echarts
onMounted(() => {
  renderEcharts()
})

watch(
  [isChartDataValid, () => pfamChartData.value, () => sortedDomains.value, () => labelMap.value],
  () => {
    // Delay rendering to ensure DOM is updated
    setTimeout(renderEcharts, 0)
  },
)

// Use Vue 3 onUnmounted hook for proper cleanup
onMounted(() => {
  // Initial render
  renderEcharts()
})

// Handle component unmount with Vue 3 syntax
onUnmounted(() => {
  if (echartsInstance) {
    echartsInstance.dispose()
    echartsInstance = null
  }
})
</script>
