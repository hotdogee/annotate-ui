<template>
  <q-page padding>
    <div class="row">
      <div class="text-h5">Pfam Domain Prediction Results</div>
    </div>
    <div class="row">
      <div class="q-my-sm text-h6">
        {{ seqHeader }}
      </div>
    </div>
    <div class="row">
      <div class="q-my-sm text-subtitle1">Sequence Length: {{ seqLength }} aa</div>
    </div>
    <ve-histogram
      :data="pfamChartData"
      :settings="pfamChartSettings"
      :legend="legend"
      :tooltip="tooltip"
    ></ve-histogram>
    <q-table
      :title="pfamTableTitle"
      :data="pfamTableData"
      :columns="pfamTableColumns"
      v-model:pagination="pagination"
      row-key="start"
    >
      <!-- slot name syntax: body-cell-<column_name> -->
      <template #body-cell-pfamAcc="props">
        <q-td :props="props">
          <q-btn
            icon-right="open_in_new"
            :label="props.value"
            color="secondary"
            flat
            dense
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
            @click="clanLink(props.value)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <br />
    <q-table
      title="Pfam32 Reference Data"
      :data="pfam32ReferenceData"
      :columns="pfamReferenceColumns"
      v-model:pagination="pagination"
      row-key="start"
    >
      <template #body-cell-pfamAcc="props">
        <q-td :props="props">
          <q-btn
            icon-right="open_in_new"
            :label="props.value"
            color="secondary"
            flat
            dense
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
            @click="clanLink(props.value)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <br />
    <q-table
      title="Pfam31 Reference Data"
      :data="pfam31ReferenceData"
      :columns="pfamReferenceColumns"
      v-model:pagination="pagination"
      row-key="start"
    >
      <template #body-cell-pfamAcc="props">
        <q-td :props="props">
          <q-btn
            icon-right="open_in_new"
            :label="props.value"
            color="secondary"
            flat
            dense
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
            @click="clanLink(props.value)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <hr class="q-hr q-my-xl" />
    <!-- <q-input
      v-model="pfamClasses"
      float-label="Classes"
      type="textarea"
    />
    <q-input
      v-model="pfamDomainMap"
      float-label="DomainMap"
      type="textarea"
    />
    <q-input
      v-model="pfamTopClasses"
      float-label="TopClasses"
      type="textarea"
    />
    <q-input
      v-model="pfamTopProbs"
      float-label="TopProbs"
      type="textarea"
    />-->
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-v2-h92.png" />
    </div>
    <search-input v-model:seq="seq"></search-input>
  </q-page>
</template>

<style lang="stylus"></style>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import 'echarts/lib/component/legendScroll'
// @ts-expect-error Missing type definitions
import numerify from 'numerify'
import { openURL } from 'quasar'
// @ts-expect-error Missing type definitions
import { isFunction } from 'utils-lite'
// @ts-expect-error Missing type definitions
import VeHistogram from 'v-charts/lib/histogram.common'
import SearchInput from 'components/SearchInput.vue'

// Types
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
  predictions: Prediction[]
  seq: string
}

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

interface ChartItem {
  dataIndex: number
  name: string
  value: number
  seriesName: string
  color: string
}

type FormatterFunction = (val: number, numerifyFn: typeof numerify) => string

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

const getFormated = (
  val: number,
  type: string | FormatterFunction,
  digit: number,
  defaultVal = '-',
): string => {
  if (isNaN(val)) return defaultVal
  if (!type) return val.toString()
  if (isFunction(type)) return (type as FormatterFunction)(val, numerify)

  digit = isNaN(digit) ? 0 : ++digit
  // Convert digit to string for Array constructor
  const digitStr = `.[${new Array(digit.toString()).join(0)}]`
  let formatter = type
  switch (type) {
    case 'KMB':
      formatter = digit ? `0,0${digitStr}a` : '0,0a'
      break
    case 'normal':
      formatter = digit ? `0,0${digitStr}` : '0,0'
      break
    case 'percent':
      formatter = digit ? `0,0${digitStr}%` : '0,0.[00]%'
      break
  }
  return numerify(val, formatter)
}

// Component setup
const route = useRoute()
const q = useQuasar()
const seq = ref('')

// Data
const current = ref<Current>({
  _id: '',
  domainMap: {},
  header: '',
  predictions: [
    {
      classes: [],
      top_classes: [],
      top_probs: [],
    },
  ],
  seq: '',
})

const legend = ref({
  type: 'scroll',
  align: 'left',
  left: 10,
})

const tooltip = ref({
  trigger: 'axis',
  formatter(items: ChartItem[]) {
    const tpl: string[] = []
    if (items && items.length > 0 && items[0]) {
      tpl.push(`${items[0].dataIndex + 1}: ${items[0].name}<br>`)
      items
        .sort((a, b) => Math.abs(b.value || 0) - Math.abs(a.value || 0))
        .forEach((item) => {
          if (isNaN(item.value)) return
          const seriesName = item.seriesName
          const type = 'percent'
          const digit = 2
          tpl.push(itemPoint(item.color))
          tpl.push(`${seriesName}: `)
          tpl.push(getFormated(item.value, type, digit))
          tpl.push('<br>')
        })
    }
    return tpl.join('')
  },
})

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
  { name: 'score', label: 'Score', field: 'score', sortable: true },
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
    return current.value.seq.length
  }
})

// These computed properties are used in the commented-out inputs in the template
// Keeping them for potential future use
/*
const pfamClasses = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions[0].classes, null, '')
  }
})

const pfamTopClasses = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions[0].top_classes, null, '')
  }
})

const pfamTopProbs = computed((): string => {
  if (!current.value) {
    return ''
  } else {
    return JSON.stringify(current.value.predictions[0].top_probs, null, '')
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
    const predictions = current.value.predictions[0]
    if (!predictions) return {}

    const probs = predictions.top_probs.flat()
    const counts: Record<string, number[]> = predictions.top_classes
      .flat()
      .reduce((a: Record<string, number[]>, c: number, i: number) => {
        const key = c.toString()
        if (!Array.isArray(a[key])) {
          a[key] = []
        }
        a[key].push(probs[i])
        return a
      }, {})

    const arrAvg = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length
    const scores: Record<string, number> = Object.keys(counts).reduce(
      (a: Record<string, number>, c: string) => {
        if (c === '1') {
          a[c] = 200
        } else {
          a[c] = arrAvg(counts[c]) * 100
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
      .sort((a, b) => scores[b] - scores[a])
      .reduce((a: Record<string, string>, c: string) => {
        if (c === '1' && current.value.domainMap[c]) {
          a[current.value.domainMap[c].pfamId] = current.value.domainMap[c].pfamId
        } else if (current.value.domainMap[c]) {
          a[current.value.domainMap[c].pfamId] =
            `${current.value.domainMap[c].pfamId}(${scores[c].toFixed(1)})`
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

const pfamChartData = computed((): ChartData => {
  if (!current.value) {
    return { columns: [], rows: [] }
  } else {
    const predictions = current.value.predictions[0]
    if (!predictions) return { columns: [], rows: [] }

    const aaKey = 'aa'
    const rows = current.value.seq.split('').map((v, i) => {
      const row: Record<string, string | number> = predictions.top_classes[i].reduce(
        (a: Record<string, number>, c: number, ii: number) => {
          if (current.value.domainMap[c]) {
            a[current.value.domainMap[c].pfamId] = predictions.top_probs[i][ii]
            if (c === 1) {
              a[current.value.domainMap[c].pfamId] *= -1
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
})

const pfamChartSettings = computed(() => {
  if (!current.value) {
    return {}
  } else {
    return {
      stack: { domains: sortedDomains.value },
      yAxisType: ['percent'],
      yAxisName: ['Probability'],
      max: [1],
      min: [-1],
      digit: 2,
      labelMap: labelMap.value,
    }
  }
})

const pfamTableData = computed((): TableRow[] => {
  if (!current.value) {
    return []
  } else {
    const predictions = current.value.predictions[0]
    if (!predictions) return []

    const PROB_MINIMUM = 0.008
    const SCORE_THRESHOLD = 0.5
    const domainThresholds = Object.keys(domainScores.value).reduce(
      (a: Record<string, number>, c: string) => {
        const score = domainScores.value[c]
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
        const [c1, c2] = classes
        const p2 = topProbs[i][1]
        // start condition: prob over threshold
        let c = c1
        if (c1 === 1 && p2 > domainThresholds[c2.toString()]) {
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
            score: domainScores.value[c].toFixed(1),
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
              score: domainScores.value[c].toFixed(1),
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
            score: domainScores.value[c].toFixed(1),
            class: c,
          })
        }
        return a
      }, [])
      .filter((row) => row.end - row.start > MIN_REGION_LENGTH - 2)
  }
})

const uniprotAcc = computed((): string => {
  const header = current.value.header
  if (!header || header.startsWith('>PROTEIN_')) return ''

  let mid = header.match(/^>tr\|(?<id>\w+)\|/)
  if (mid?.groups) {
    const msv = header.match(/SV=(?<sv>\d+)/)
    if (msv?.groups) {
      return `${mid.groups.id}.${msv.groups.sv}`
    }
    return `${mid.groups.id}.1`
  }

  mid = header.match(/^>(?<id>\w+)(?:\.(?<sv>\d+))?/)
  if (mid?.groups) {
    if (mid.groups.sv) {
      return `${mid.groups.id}.${mid.groups.sv}`
    }
    return `${mid.groups.id}.1`
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

interface ReferenceData {
  refName: string
  start: number
  end: number
  [key: string]: unknown
}

interface FeathersVuexApi {
  Pfam: {
    getFromStore: (id: string) => Current | null
    get: (id: string) => Promise<Current>
  }
  Reference: {
    findInStore: (query: { query: { seqAcc: string } }) => { total: number; data: ReferenceData[] }
    find: (query: {
      query: { seqAcc: string }
    }) => Promise<{ total: number; data: ReferenceData[] }>
  }
}

interface FeathersVuex {
  api: FeathersVuexApi
}

interface WindowWithFeathersVuex extends Window {
  $FeathersVuex: FeathersVuex
}

const fetchData = async (): Promise<void> => {
  const id = route.params.id as string
  console.debug(id) // Replacing this.$debug(id)

  // Assuming $FeathersVuex is available globally or through a plugin
  const { Pfam, Reference } = (window as unknown as WindowWithFeathersVuex).$FeathersVuex.api

  try {
    // try fetching from the store
    let result = Pfam.getFromStore(id)
    if (!result) {
      // try fetch from server
      result = await Pfam.get(id)
    }
    current.value = result
    seq.value = `${current.value.header}\n${current.value.seq}`
  } catch (_error) {
    // Notify user about error
    q.notify({
      position: 'center',
      message: 'Result does not exist',
      actions: [{ label: 'Dismiss' }],
    })
  }

  // fetch reference
  if (uniprotAcc.value) {
    // try fetching from the store
    let result = Reference.findInStore({ query: { seqAcc: uniprotAcc.value } })
    if (result.total === 0) {
      // try fetch from server
      result = await Reference.find({ query: { seqAcc: uniprotAcc.value } })
    }
    pfam32ReferenceData.value = result.data
      .filter((r: ReferenceData) => r.refName === 'pfam32')
      .sort((a: ReferenceData, b: ReferenceData) => a.start - b.start)
    pfam31ReferenceData.value = result.data
      .filter((r: ReferenceData) => r.refName === 'pfam31')
      .sort((a: ReferenceData, b: ReferenceData) => a.start - b.start)
  }
}

// Lifecycle hooks and watchers
onMounted(() => {
  fetchData()
})

watch(
  () => route.params.id,
  () => {
    fetchData()
  },
)
</script>
