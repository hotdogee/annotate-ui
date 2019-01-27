<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
    <ve-histogram
      :data="pfamChartData"
      :settings="pfamChartSettings"
      :title="title"
      :legend="legend"
      :tooltip="tooltip"
    ></ve-histogram>
    <q-input
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
    />
  </q-page>
</template>

<style lang="stylus">
// #protein-field .q-input
//   font-family monospace
// //   height 200px
// // .q-layout-page > .row + .row
// #predict
//   margin-top 1.5rem
// #example-btn
//   margin-top 21px
//   margin-right 5px
</style>

<script>
import { mapGetters } from 'vuex'
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
      title: {
        text: '男性女性身高体重分布',
        subtext: '抽样调查来自: Heinz  2003'
      },
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
      chartSettings: {
        stack: {
          'yyy': ['cost', 'profit']
        }
      },
      chartData: {
        columns: ['date', 'cost', 'profit'],
        rows: [
          { 'date': '01/01', 'cost': -123, 'profit': 300 },
          { 'date': '01/01', 'cost': -1223, 'profit': 600 },
          { 'date': '01/03', 'cost': -2123, 'profit': 9000 },
          { 'date': '01/03', 'cost': -4123, 'profit': 1200 },
          { 'date': '01/05', 'cost': -3123, 'profit': 1500 },
          { 'date': '01/01', 'cost': -7123, 'profit': 2000 }
        ]
      }
    }
  },
  created () {
    // fetch the data when the view is created
    if (!this.current || this.current._id !== this.$route.params.id) {
      const { Pfam } = this.$FeathersVuex
      Pfam.get(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters('pfam', { current: 'current' }),
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
    pfamChartData () {
      if (!this.current) {
        return {}
      } else {
        const aaKey = 'aa'
        const rows = this.current.seq.split('').map((v, i) => {
          const row = this.current.predictions[0].top_classes[i].reduce((a, c, ii) => {
            a[this.current.domainMap[c]] = this.current.predictions[0].top_probs[i][ii]
            return a
          }, {})
          row[aaKey] = v
          return row
        })
        console.log(this.current.domainMap)
        const columns = Object.values(this.current.domainMap)
        columns.unshift(aaKey)
        return { columns, rows }
      }
    },
    pfamChartSettings () {
      if (!this.current) {
        return {}
      } else {
        const domains = Object.values(this.current.domainMap)
        return {
          stack: { domains },
          yAxisType: ['percent'],
          yAxisName: ['Probability'],
          digit: 2
        }
      }
    }
  },
  methods: {

  }
}
</script>
