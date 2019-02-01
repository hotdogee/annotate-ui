<template>
  <q-page padding>
    <div class="row">
      <img class="" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
    <div class="row">
      <div class="q-headline">Pfam Domain Prediction Results</div>
    </div>
    <div class="row">
      <div class="q-my-sm q-title">{{ seqHeader }}</div>
    </div>
    <div class="row">
      <div class="q-my-sm q-subheading">Sequence Length: {{ seqLength }} aa</div>
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
      row-key="start"
    />
    <hr class="q-hr q-my-xl">
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
    /> -->
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 col-lg-8">
        <div class="row no-wrap q-field-floating">
          <q-btn
            icon="keyboard_arrow_right"
            color="primary"
            flat round dense
            id="example-btn"
          >
            <q-popover>
              <q-list link class="scroll" style="min-width: 100px; max-width: 90vw;">
                <q-list-header>Recent Submissions</q-list-header>
                <q-item-separator />
                <q-list-header>Example Proteins</q-list-header>
                <q-item
                  v-for="fasta in examples"
                  :key="fasta"
                  v-close-overlay
                  @click.native="loadSeq(fasta)"
                >
                  <q-item-main
                    :label="fastaId(fasta)"
                    label-lines="1"
                    :sublabel="fastaDescription(fasta)"
                    sublabel-lines="1"
                  />
                  <q-item-side right>
                    <q-item-tile stamp>{{ fastaLength(fasta) }} aa</q-item-tile>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
          <q-field
            id="protein-field"
            class="col q-subheading"
            label=""
            :helper="inputHelper"
            :error="$v.seq.$error"
            :error-label="errorMessages($v.seq)"
          >
            <q-input
              v-model="seq"
              clearable
              autocomplete="off"
              rows="2"
              float-label="Protein Sequence"
              type="textarea"
              @blur="$v.seq.$touch"
            />
          </q-field>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <q-btn
        id="predict"
        :label="predictLabel"
        color="primary"
        @click='predict'
      />
    </div>
  </q-page>
</template>

<style lang="stylus">
#protein-field .q-input
  font-family monospace
//   height 200px
// .q-layout-page > .row + .row
#predict
  margin-top 1.5rem
#example-btn
  margin-top 21px
  margin-right 5px
</style>

<script>
import { mapState, mapGetters } from 'vuex'
import { maxLength } from 'vuelidate/lib/validators'
import { isProtein } from 'assets/validators'
import VeHistogram from 'v-charts/lib/histogram.common'
import 'echarts/lib/component/legendScroll'
import numerify from 'numerify'
import { isFunction } from 'utils-lite'

const itemPoint = (color) => {
  return [
    '<span style="',
    `background-color:${color};`,
    'display: inline-block;',
    'width: 10px;',
    'height: 10px;',
    'border-radius: 50%;',
    'margin-right:2px;',
    '"></span>'
  ].join('')
}

const getFormated = (val, type, digit, defaultVal = '-') => {
  if (isNaN(val)) return defaultVal
  if (!type) return val
  if (isFunction(type)) return type(val, numerify)

  digit = isNaN(digit) ? 0 : ++digit
  const digitStr = `.[${new Array(digit).join(0)}]`
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

export default {
  name: 'PfamDetail',
  components: { VeHistogram },
  data () {
    return {
      seq: '',
      examples: [
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
KIYVSDDGKAHFSISNSAEDPFIAIHAESKL`
      ],
      legend: {
        type: 'scroll',
        align: 'left',
        left: 10
      },
      tooltip: {
        trigger: 'axis',
        formatter (items) {
          let tpl = []
          tpl.push(`${items[0].name}<br>`)
          items.forEach(item => {
            if (isNaN(item.value)) return
            const seriesName = item.seriesName
            const type = 'percent'
            const digit = 2
            tpl.push(itemPoint(item.color))
            tpl.push(`${seriesName}: `)
            tpl.push(getFormated(item.value, type, digit))
            tpl.push('<br>')
          })

          return tpl.join('')
        }
      },
      pfamTableTitle: '', // 'Predicted Pfam Regions'
      pfamTableColumns: [
        // column Object definition
        // {
        //   // unique id (used by row-key, pagination.sortBy, ...)
        //   name: 'desc',

        //   // label for header
        //   label: 'Dessert (100g serving)',

        //   // row Object property to determine value for this column
        //   field: 'name',
        //   // OR field: row => row.some.nested.prop

        //   // (optional) if we use visible-columns, this col will always be visible
        //   required: true,

        //   // (optional) alignment
        //   align: 'left',

        //   // (optional) tell QTable you want this column sortable
        //   sortable: true,

        //   // (optional) compare function if you have
        //   // some custom data or want a specific way to compare two rows
        //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        //   // function return value:
        //   //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
        //   //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
        //   //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

        //   // (optional) you can format the data with a function
        //   format: val => `${val}%`

        //   // v0.17.9+; if using scoped slots, apply this yourself instead
        //   style: 'width: 500px',
        //   classes: 'my-special-class'
        // }
        { name: 'start', label: 'Start', field: 'start', sortable: true },
        { name: 'end', label: 'End', field: 'end', sortable: true },
        { name: 'pfamAcc', label: 'Pfam accession', field: 'pfamAcc', sortable: true },
        { name: 'pfamId', label: 'Pfam ID', field: 'pfamId', sortable: true },
        { name: 'clanAcc', label: 'Clan accession', field: 'clanAcc', sortable: true },
        { name: 'clanId', label: 'Clan ID', field: 'clanId', sortable: true },
        { name: 'pfamDesc', label: 'Pfam description', field: 'pfamDesc', sortable: false }
      ]
    }
  },
  validations: {
    seq: {
      maxLength: maxLength(50000),
      isProtein: isProtein()
    }
  },
  watch: {
    isCreatePending (val, oldVal) {
      // console.log('isCreatePending new: %s, old: %s', val, oldVal)
      if (val === false) {
        // get id
        if (this.$store.getters['pfam/current']) {
          this.$router.push({ path: `/pfam/${this.$store.getters['pfam/current']._id}` })
        }
      }
    }
  },
  async created () {
    // fetch the data when the view is created
    if (!this.current || this.current._id !== this.$route.params.id) {
      const { Pfam } = this.$FeathersVuex
      await Pfam.get(this.$route.params.id)
    }
    // console.log(pfam.seq)
    this.seq = `${this.current.header}\n${this.current.seq}`
  },
  computed: {
    ...mapState('pfam', { isCreatePending: 'isCreatePending' }),
    ...mapGetters('pfam', { current: 'current' }),
    seqHeader () {
      if (!this.current) {
        return ''
      } else {
        return this.current.header
      }
    },
    seqLength () {
      if (!this.current) {
        return ''
      } else {
        return this.current.seq.length
      }
    },
    pfamClasses () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].classes, null, '')
      }
    },
    pfamTopClasses () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].top_classes, null, '')
      }
    },
    pfamTopProbs () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.predictions[0].top_probs, null, '')
      }
    },
    pfamDomainMap () {
      if (!this.current) {
        return ''
      } else {
        return JSON.stringify(this.current.domainMap, null, '')
      }
    },
    sortedDomains () {
      if (!this.current) {
        return []
      } else {
        const counts = this.current.predictions[0].top_classes.flat().reduce((a, c) => {
          a[c] = a[c] ? a[c] + 1 : 1
          return a
        }, {})
        return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map((v) => this.current.domainMap[v].pfamId)
      }
    },
    pfamChartData () {
      if (!this.current) {
        return {}
      } else {
        const aaKey = 'aa'
        const rows = this.current.seq.split('').map((v, i) => {
          const row = this.current.predictions[0].top_classes[i].reduce((a, c, ii) => {
            a[this.current.domainMap[c].pfamId] = this.current.predictions[0].top_probs[i][ii]
            if (c === 1) {
              a[this.current.domainMap[c].pfamId] *= -1
            }
            return a
          }, {})
          row[aaKey] = v
          return row
        })
        // console.log([aaKey].concat(this.sortedDomains))
        return {
          columns: [aaKey].concat(this.sortedDomains),
          rows
        }
      }
    },
    pfamChartSettings () {
      if (!this.current) {
        return {}
      } else {
        return {
          stack: { domains: this.sortedDomains },
          yAxisType: ['percent'],
          yAxisName: ['Probability'],
          max: [1],
          min: [-1],
          digit: 2
        }
      }
    },
    pfamTableData () {
      if (!this.current) {
        return []
      } else {
        return this.current.predictions[0].classes.reduce((a, v, i, c) => {
          if (v !== 1) {
            if (v !== c[i - 1]) {
              // start a new row
              a.push({
                start: i + 1, // 1-indexed
                end: i + 1,
                pfamAcc: this.current.domainMap[v].pfamAcc,
                pfamId: this.current.domainMap[v].pfamId,
                clanAcc: this.current.domainMap[v].clanAcc,
                clanId: this.current.domainMap[v].clanId,
                pfamDesc: this.current.domainMap[v].pfamDesc
              })
            } else {
              a.slice(-1)[0].end = i + 1
            }
          }
          return a
        }, []).filter(row => row.end - row.start > 3)
      }
    },
    inputCount () {
      // support 3 multi-sequence formats
      // case 1 standard fasta
      // case 2 no header single sequence
      // case 2 no header multi sequence
      const seq = this.seq.trim()
      if (!seq) {
        return 0
      }
      if (seq[0] === '>') {
        return seq.match(/^\s*>/mg).length
      }
      const lines = seq.split('\n').reduce((a, v) => {
        // remove empty lines
        v = v.trim()
        if (v) {
          a.push(v)
        }
        return a
      }, [])
      if (lines.length === 1 || lines[0].length === lines[1].length) {
        return 1
      } else {
        return lines.length
      }
    },
    inputLength () {
      // support 3 multi-sequence formats
      // case 1 standard fasta
      // case 2 no header single sequence
      // case 2 no header multi sequence
      const seq = this.seq.trim()
      if (!seq) {
        return 0
      }
      const lines = seq.split('\n').reduce((a, v) => {
        // remove empty lines
        v = v.trim()
        if (v && v[0] !== '>') {
          a.push(v)
        }
        return a
      }, [])
      return lines.join('').length
    },
    inputHelper () {
      if (this.inputCount === 0) {
        return 'Enter a single protein sequence with or without a header'
      } else if (this.inputCount === 1) {
        return `1 sequence (${this.inputLength} aa)`
      } else {
        return `${this.inputCount} sequences (${this.inputLength} aa total)`
      }
    },
    predictLabel () {
      if (this.inputCount === 0) {
        return 'Submit'
      } else if (this.inputCount === 1) {
        return `Submit 1 sequence`
      } else {
        return `Submit ${this.inputCount} sequences`
      }
    },
    seqList () {
      const list = []
      // support 3 multi-sequence formats
      // case 1 standard fasta
      // case 2 no header single sequence
      // case 2 no header multi sequence
      const seq = this.seq.trim()
      if (!seq) {
        return list
      }
      if (seq[0] === '>') {
        return seq.split('\n').reduce((a, v) => {
          // remove empty lines
          v = v.trim()
          if (v[0] === '>') {
            const s = {
              header: v,
              seq: ''
            }
            a.push(s)
          } else {
            a.slice(-1)[0].seq += v
          }
          return a
        }, [])
      }
      const lines = seq.split('\n').reduce((a, v) => {
        // remove empty lines
        v = v.trim()
        if (v) {
          a.push(v)
        }
        return a
      }, [])
      if (lines.length === 1 || lines[0].length === lines[1].length) {
        return [{
          header: '>PROTEIN_00001',
          seq: lines.join('')
        }]
      } else {
        return lines.map((v, i) => {
          return {
            header: `>PROTEIN_${('' + (i + 1)).padStart(5, '0')}`,
            seq: v
          }
        })
      }
    }
  },
  methods: {
    predict () {
      // this.$v.seq.$touch()
      if (!this.seq || this.$v.seq.$error) {
        this.$q.notify('Please enter a valid protein sequence')
        return
      }
      if (this.seqList.length > 1) {
        this.$q.notify('Due to our limited resources, please submit only 1 sequence')
        return
      }
      const { Pfam } = this.$FeathersVuex
      const pfam = new Pfam(this.seqList[0])
      pfam.create()
    },
    fastaId (fasta) {
      /*
      let seq = `>tr|A6XGL2|A6XGL2_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1
 mALWMRLLPLLALLaLWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED
LQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN `
*/
      return this.fastaHeader(fasta).split(' ')[0]
    },
    fastaHeader (fasta) {
      return fasta.split('\n')[0].trim()
    },
    fastaDescription (fasta) {
      return this.fastaHeader(fasta).substring(this.fastaId(fasta).length)
    },
    fastaLine (fasta) {
      return fasta.split('\n').slice(1).map(line => line.trim().toUpperCase()).join('')
    },
    fastaLength (fasta) {
      return this.fastaLine(fasta).length
    },
    loadSeq (fasta) {
      // console.log(fasta)
      this.seq = '>PROTEIN_00001\n' + fasta.split('\n').slice(1).map(line => line.trim().toUpperCase()).join('\n')
    },
    errorMessages (vState) {
      if (!vState.$error) {
        return ''
      }
      for (let type in vState.$params) {
        if (!vState[type]) {
          if (type === 'apiErrors') {
            return this.$t(this.errors[vState.$params[type].field])
          } else {
            return this.$t(type, vState.$params[type])
          }
        }
      }
    }
  }
}
</script>
