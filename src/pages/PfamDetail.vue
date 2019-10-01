<template>
  <q-page padding>
    <div class="row">
      <div class="text-h5">
        Pfam Domain Prediction Results
      </div>
    </div>
    <div class="row">
      <div class="q-my-sm text-h6">
        {{ seqHeader }}
      </div>
    </div>
    <div class="row">
      <div class="q-my-sm text-subtitle1">
        Sequence Length: {{ seqLength }} aa
      </div>
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
    >
      <!-- slot name syntax: body-cell-<column_name> -->
      <q-td
        slot="body-cell-pfamAcc"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          icon-right="open_in_new"
          :label="props.value"
          color="secondary"
          flat
          dense
          @click="familyLink(props.value)"
        ></q-btn>
      </q-td>
      <q-td
        slot="body-cell-clanAcc"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          icon-right="open_in_new"
          :label="props.value"
          color="secondary"
          flat
          dense
          @click="clanLink(props.value)"
        ></q-btn>
      </q-td>
    </q-table>
    <br />
    <q-table
      title="Pfam32 Reference Data"
      :data="pfam32ReferenceData"
      :columns="pfam32ReferenceColumns"
      row-key="start"
    >
      <!-- slot name syntax: body-cell-<column_name> -->
      <q-td
        slot="body-cell-pfamAcc"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          icon-right="open_in_new"
          :label="props.value"
          color="secondary"
          flat
          dense
          @click="familyLink(props.value)"
        ></q-btn>
      </q-td>
      <q-td
        slot="body-cell-clanAcc"
        slot-scope="props"
        :props="props"
      >
        <q-btn
          icon-right="open_in_new"
          :label="props.value"
          color="secondary"
          flat
          dense
          @click="clanLink(props.value)"
        ></q-btn>
      </q-td>
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
      <img
        class="center"
        alt="ANNotate logo"
        src="~assets/annotate-logo-long-v2-h92.png"
      />
    </div>
    <search-input :seq.sync="seq"></search-input>
  </q-page>
</template>

<style lang="stylus"></style>

<script>
// import { mapGetters } from 'vuex'
import 'echarts/lib/component/legendScroll'
import numerify from 'numerify'
import { openURL } from 'quasar'
import { isFunction } from 'utils-lite'
import SearchInput from 'components/SearchInput'
import VeHistogram from 'v-charts/lib/histogram.common'

const itemPoint = color => {
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
  components: { VeHistogram, SearchInput },
  data () {
    return {
      current: {
        _id: '',
        domainMap: {},
        header: '',
        predictions: [
          {
            classes: [],
            top_classes: [],
            top_probs: []
          }
        ],
        seq: ''
      },
      seq: '',
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
      ],
      pfam32ReferenceColumns: [
        { name: 'start', label: 'Start', field: 'start', sortable: true },
        { name: 'end', label: 'End', field: 'end', sortable: true },
        { name: 'pfamAcc', label: 'Pfam accession', field: 'pfamAcc', sortable: true },
        { name: 'pfamId', label: 'Pfam ID', field: 'pfamId', sortable: true },
        { name: 'clanAcc', label: 'Clan accession', field: 'clanAcc', sortable: true },
        { name: 'clanId', label: 'Clan ID', field: 'clanId', sortable: true },
        { name: 'pfamDesc', label: 'Pfam description', field: 'pfamDesc', sortable: false }
      ],
      pfam32ReferenceData: []
    }
  },
  computed: {
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
        return Object.keys(counts)
          .sort((a, b) => counts[b] - counts[a])
          .map(v => this.current.domainMap[v].pfamId)
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
        return this.current.predictions[0].classes
          .reduce((a, v, i, c) => {
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
          }, [])
          .filter(row => row.end - row.start > 3)
      }
    },
    uniprotAcc () {
      const header = this.current.header
      if (!header || header.startsWith('>PROTEIN_')) return ''
      // >PROTEIN_00001
      // https://www.uniprot.org/uniprot/I6AQA9.fasta
      // >tr|I6AQA9|I6AQA9_9BACT Alpha-mannosidase OS=Opitutaceae bacterium TAV1 OX=278956 GN=OpiT1DRAFT_01631 PE=4 SV=1
      // parse uniprot format
      // header.match(/^>tr\|(?<id>\w+)\|.+(?:SV=(?<sv>\d+))?/)
      let mid = header.match(/^>tr\|(?<id>\w+)\|/)
      if (mid) {
        const msv = header.match(/SV=(?<sv>\d+)/)
        if (msv) {
          return `${mid.groups.id}.${msv.groups.sv}`
        }
        return `${mid.groups.id}.1`
      }
      // >I6AQA9.1
      // >I6AQA9
      mid = header.match(/^>(?<id>\w+)(?:\.(?<sv>\d+))?/)
      if (mid) {
        if (mid.groups.sv) {
          return `${mid.groups.id}.${mid.groups.sv}`
        }
        return `${mid.groups.id}.1`
      }
      return ''
    }
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData'
  },
  created () {
    this.fetchData()
  },
  methods: {
    familyLink (pfamAcc) {
      openURL(`http://pfam.xfam.org/family/${pfamAcc}`)
    },
    clanLink (clanAcc) {
      openURL(`http://pfam.xfam.org/clan/${clanAcc}`)
    },
    async fetchData () {
      // document.getElementById('q-app').__vue__.$FeathersVuex.api.Pfam
      const id = this.$route.params.id
      this.$debug(id)
      const { Pfam, Reference } = this.$FeathersVuex.api
      try {
        // try fetching from the store
        let result = Pfam.getFromStore(id)
        if (!result) {
          // try fetch from server
          result = await Pfam.get(id)
        }
        this.current = result
        this.seq = `${this.current.header}\n${this.current.seq}`
      } catch (error) {
        this.$q.notify({
          position: 'center',
          message: 'Result does not exist',
          actions: [{ label: 'Dismiss' }]
        })
      }
      // fetch reference
      // document.getElementById('q-app').__vue__.$FeathersVuex.api.Reference
      if (this.uniprotAcc) {
        // try fetching from the store
        let result = Reference.findInStore({ query: { seqAcc: this.uniprotAcc } })
        if (result.total === 0) {
          // try fetch from server
          result = await Reference.find({ query: { seqAcc: this.uniprotAcc } })
        }
        this.pfam32ReferenceData = result.data
      }
    }
  }
}
</script>
