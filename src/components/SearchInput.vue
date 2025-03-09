<template>
  <div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 col-lg-8">
        <div class="row no-wrap q-field-floating">
          <q-btn
            id="example-btn"
            icon="keyboard_arrow_right"
            color="primary"
            flat
            dense
            @click="disableTutorial"
          >
            <q-tooltip
              v-model="showTip"
              class="text-body2 tooltip-with-arrow"
              anchor="top middle"
              self="bottom middle"
              :hide-delay="100"
              transition-show="scale"
              transition-hide="scale"
              >Example sequences</q-tooltip
            >
            <q-menu>
              <q-list bordered padding class="scroll" style="min-width: 100px; max-width: 90vw">
                <q-item>
                  <q-item-section>
                    <q-item-label id="recents__header" header> Recent Submissions </q-item-label>
                  </q-item-section>
                  <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="clearRecents"
                      >
                        <q-tooltip :delay="500" anchor="center left" self="center right">
                          Clear Recent Submissions
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="fasta in recents"
                  :key="fasta"
                  v-close-popup
                  clickable
                  @click="loadRecent(fasta)"
                >
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ fastaHeader(fasta) }}
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ fastaLine(fasta) }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption> {{ fastaLength(fasta) }} aa </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item-label header> Example Proteins </q-item-label>
                <q-item
                  v-for="fasta in examples"
                  :key="fasta"
                  v-close-popup
                  clickable
                  @click="loadSeq(fasta)"
                >
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ fastaId(fasta) }}
                    </q-item-label>
                    <q-item-label caption lines="1">
                      {{ fastaDescription(fasta) }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption> {{ fastaLength(fasta) }} aa </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-input
            v-model="seq"
            class="col q-subheading protein-field"
            clearable
            autofocus
            autocomplete="off"
            label="Protein Sequence in FASTA format"
            type="textarea"
            autogrow
            :hint="seqHelper"
            :error="v$.seq.$error"
            :error-message="errorMessages(v$.seq)"
            @update:model-value="v$.seq.$touch"
          />
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <q-btn
        id="predict"
        :label="predictLabel"
        color="primary"
        @click="predict"
        :loading="isLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength } from '@vuelidate/validators'
import { isProtein } from 'assets/validators'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { pfam } from 'src/boot/feathers'
import { useMutation, useQueryCache } from '@pinia/colada'

const seq = defineModel('seq', {
  type: String,
  default: '',
})

// Validation rules
const rules = {
  seq: {
    maxLength: maxLength(50000),
    isProtein: isProtein(),
  },
}

const v$ = useVuelidate(rules, { seq })

const errorMessages = (vState: { $errors: Array<{ $message: string | Ref<string> }> }) =>
  vState.$errors
    .map((error) => (typeof error.$message === 'string' ? error.$message : error.$message.value))
    .join(', ')

const router = useRouter()
const $q = useQuasar()

const model = ref('pfam')
const version = ref('1568346315')

// Example sequences
const examples = ref([
  `>tr|A6XGL2|A6XGL2_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED
LQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN`,
  `>sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK`,
  `>sp|P04745|AMY1_HUMAN Alpha-amylase 1 OS=Homo sapiens OX=9606 GN=AMY1A PE=1 SV=2
MKLFWLLFTIGFCWAQYSSNTQQGRTSIVHLFEWRWVDIALECERYLAPKGFGGVQVSPP
NENVAIHNPFRPWWERYQPVSYKLCTRSGNEDEFRNMVTRCNNVGVRIYVDAVINHMCGN
AVSAGTSSTCGSYFNPGSRDFPAVPYSGWDFNDGKCKTGSGDIENYNDATQVRDCRLSGL
LDLALGKDYVRSKIAEYMNHLIDIGVAGFRIDASKHMWPGDIKAILDKLHNLNSNWFPEG
SKPFIYQEVIDLGGEPIKSSDYFGNGRVTEFKYGAKLGTVIRKWNGEKMSYLKNWGEGWG
FMPSDRALVFVDNHDNQRGHGAGGASILTFWDARLYKMAVGFMLAHPYGFTRVMSSYRWP
RYFENGKDVNDWVGPPNDNGVTKEVTINPDTTCGNDWVCEHRWRQIRNMVNFRNVVDGQP
FTNWYDNGSNQVAFGRGNRGFIVFNNDDWTFSLTLQTGLPAGTYCDVISGDKINGNCTGI
KIYVSDDGKAHFSISNSAEDPFIAIHAESKL`,
])

// Computed properties
const seqCount = computed(() => {
  if (!seq.value || typeof seq.value !== 'string') {
    return 0
  }
  const sequence = seq.value.trim()
  if (sequence[0] === '>') {
    return sequence.match(/^\s*>/gm)?.length ?? 0
  }
  const lines = sequence.split('\n').reduce<string[]>((a, v) => {
    v = v.trim()
    if (v) {
      a.push(v)
    }
    return a
  }, [])
  if (
    lines.length === 1 ||
    (lines.length >= 2 && lines[0] && lines[1] && lines[0].length === lines[1].length)
  ) {
    return 1
  } else {
    return lines.length
  }
})

const seqLength = computed(() => {
  const sequence = seq.value.trim()
  if (!sequence) {
    return 0
  }
  const lines = sequence.split('\n').reduce((a: string[], v) => {
    v = v.trim()
    if (v && v[0] !== '>') {
      a.push(v)
    }
    return a
  }, [])
  return lines.join('').length
})

const seqHelper = computed(() => {
  if (seqCount.value === 0) {
    return 'Enter a single protein sequence with or without a header'
  } else if (seqCount.value === 1) {
    return `1 sequence (${seqLength.value} aa)`
  } else {
    return `${seqCount.value} sequences (${seqLength.value} aa total)`
  }
})

const predictLabel = computed(() => {
  if (seqCount.value === 0) {
    return 'Submit'
  } else if (seqCount.value === 1) {
    return `Submit 1 sequence`
  } else {
    return `Submit ${seqCount.value} sequences`
  }
})

interface SeqItem {
  header: string
  sequence: string
  model: string
  version: string
}

const seqList = computed(() => {
  const list: SeqItem[] = []
  const sequence = seq.value.trim()
  if (!sequence) {
    return list
  }
  if (sequence[0] === '>') {
    return sequence.split('\n').reduce((a: SeqItem[], v) => {
      v = v.trim()
      if (v[0] === '>') {
        const s = {
          header: v,
          sequence: '',
          model: model.value,
          version: version.value,
        }
        a.push(s)
      } else {
        const lastItem = a.slice(-1)[0]
        if (lastItem) {
          lastItem.sequence += v
        }
      }
      return a
    }, [])
  }
  const lines = sequence.split('\n').reduce<string[]>((a, v) => {
    v = v.trim()
    if (v) {
      a.push(v)
    }
    return a
  }, [])
  if (
    lines.length === 1 ||
    (lines.length > 1 && lines[0] && lines[1] && lines[0].length === lines[1].length)
  ) {
    return [
      {
        header: '>PROTEIN_00001',
        sequence: lines.join(''),
        model: model.value,
        version: version.value,
      },
    ]
  } else {
    return lines.map((v, i) => ({
      header: `>PROTEIN_${('' + (i + 1)).padStart(5, '0')}`,
      sequence: v,
      model: model.value,
      version: version.value,
    }))
  }
})

const showTip = ref(false)
const showTutorial = useStorage('protein-input:showTutorial', true)
// Methods
const disableTutorial = () => {
  showTutorial.value = false
}

// Lifecycle hooks
onMounted(() => {
  setTimeout(() => {
    if (showTutorial.value === true) {
      showTip.value = true
    }
  }, 1000)
})

const queryCache = useQueryCache()

const {
  mutate: createPfam,
  isLoading,
  // status,
  // asyncStatus,
} = useMutation({
  mutation: (data: SeqItem) => pfam.create(data),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess: async (result, data, context) => {
    // console.log('data', data)
    console.log('result', result)
    // // {}
    // console.log('context', context)
    // set cache
    queryCache.setQueryData(['pfam', result._id], result)
    await router.push({ name: 'pfam', params: { id: result._id } })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (error, data, context) => {
    // error = {
    // "name": "BadRequest",
    // "message": "Error resolving data",
    // "code": 400,
    // "className": "bad-request",
    // }
    // Error: operation has timed out
    // console.error('error', error)
    // console.log('data', data)
    // context = {}
    // console.log('context', context)
    $q.notify({
      type: 'negative',
      progress: true,
      position: 'center',
      message: 'Prediction Service Unavailable',
      actions: [{ color: 'white', label: 'Dismiss', 'aria-label': 'Dismiss' }],
    })
  },
})

const predict = async () => {
  const isValid = await v$.value.seq.$validate()
  if (!seq.value || !isValid) {
    $q.notify({
      position: 'center',
      message: 'Please enter a valid protein sequence',
      actions: [{ label: 'Dismiss' }],
    })
    return
  }
  if (seqList.value.length > 1) {
    $q.notify({
      position: 'center',
      message: 'Due to limited resources, please submit only 1 sequence',
      actions: [{ label: 'Dismiss' }],
    })
    return
  }

  const data = seqList.value[0]
  if (!data) return

  // window.$ga.event('pfam', 'create', 'count', seqCount.value)
  // window.$ga.event('pfam', 'create', 'length', seqLength.value)

  addToRecents(`${data.header}\n${data.sequence}`)
  createPfam(data)
}

const recents = useStorage<string[]>('protein-input:recents', [])

const addToRecents = (fasta: string) => {
  const limit = 10
  const i = recents.value.indexOf(fasta)
  if (i !== -1) {
    recents.value.splice(i, 1)
  }
  recents.value.unshift(fasta)
  while (recents.value.length > limit) {
    recents.value.pop()
  }
}

const clearRecents = () => {
  recents.value = []
}

const fastaId = (fasta: string) => {
  const header = fastaHeader(fasta)
  return header ? header.split(' ')[0] : ''
}

const fastaHeader = (fasta: string) => {
  const lines = fasta.split('\n')
  return lines?.[0]?.trim() || ''
}

const fastaDescription = (fasta: string) => {
  const header = fastaHeader(fasta)
  const id = fastaId(fasta)
  return header && id ? header.substring(id.length) : ''
}

const fastaLine = (fasta: string) => {
  return fasta
    .split('\n')
    .slice(1)
    .map((line: string) => line.trim().toUpperCase())
    .join('')
}

const fastaLength = (fasta: string) => {
  return fastaLine(fasta).length
}

const loadSeq = (fasta: string) => {
  seq.value =
    '>PROTEIN_00001\n' +
    fasta
      .split('\n')
      .slice(1)
      .map((line: string) => line.trim().toUpperCase())
      .join('\n')
}

const loadRecent = (fasta: string) => {
  seq.value = fasta
}

defineExpose({
  predict,
  disableTutorial,
  clearRecents,
  loadSeq,
  loadRecent,
  fastaId,
  fastaHeader,
  fastaDescription,
  fastaLine,
  fastaLength,
  errorMessages,
})
</script>

<style>
.protein-field {
  font-family: monospace;
}

.tooltip-with-arrow {
  overflow-y: unset;
  overflow-x: unset;
}

.tooltip-with-arrow::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px 8px 0;
  border-style: solid;
  border-color: #757575 transparent transparent transparent;
}

#predict {
  margin-top: 1.5rem;
}

#example-btn {
  margin-top: 21px;
  margin-right: 5px;
}

#example-btn::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: gray;
  animation: flash 5s infinite ease-in-out;
  opacity: 0;
  border-radius: inherit;
}

#recents__header {
  padding: 0px;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
}

.tooltip[x-placement^='top'] {
  margin-bottom: 5px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='bottom'] {
  margin-top: 5px;
}

.tooltip[x-placement^='bottom'] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='right'] {
  margin-left: 5px;
}

.tooltip[x-placement^='right'] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^='left'] {
  margin-right: 5px;
}

.tooltip[x-placement^='left'] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.15s,
    visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

@keyframes flash {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
