<template>
  <q-page padding>
    <div class="row justify-center">
      <img
        class="center"
        alt="ANNotate logo"
        src="~assets/annotate-logo-long-v2-h92.png"
      />
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 col-lg-8">
        <div class="row no-wrap q-field-floating">
          <q-btn
            id="example-btn"
            v-tooltip="{
              content: 'Load example sequences here',
              show: showTip,
              delay: { show: 500, hide: 100 }
            }"
            icon="keyboard_arrow_right"
            color="primary"
            flat
            round
            dense
            @click="disableTutorial"
          >
            <q-menu auto-close>
              <q-list
                bordered
                padding
                class="scroll"
                style="min-width: 100px; max-width: 90vw;"
              >
                <q-item-label header>
                  Recent Submissions
                </q-item-label>
                <q-separator spaced />
                <q-item-label header>
                  Example Proteins
                </q-item-label>
                <q-item
                  v-for="fasta in examples"
                  :key="fasta"
                  clickable
                  @click="loadSeq(fasta)"
                >
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ fastaId(fasta) }}
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="1"
                    >
                      {{ fastaDescription(fasta) }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                  >
                    <q-item-label caption>
                      {{ fastaLength(fasta) }} aa
                    </q-item-label>
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
            label="Protein Sequence"
            type="textarea"
            rows="2"
            autogrow
            :hint="seqHelper"
            :error="$v.seq.$error"
            :error-message="errorMessages($v.seq)"
            @blur="$v.seq.$touch"
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
      />
    </div>
    <!-- <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    />-->
  </q-page>
</template>

<style lang="stylus">
.protein-field {
  font-family: monospace;
}

// height 200px
// .q-layout-page > .row + .row
#predict {
  margin-top: 1.5rem;
}

#example-btn {
  margin-top: 21px;
  margin-right: 5px;
}
</style>

<style>
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
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>

<script>
import { mapState } from 'vuex'
import { maxLength } from 'vuelidate/lib/validators'
import { isProtein } from 'assets/validators'
/*
40S ribosomal protein S18 [Homo sapiens]
NCBI Reference Sequence: NP_072045.1
https://www.ncbi.nlm.nih.gov/protein/NP_072045.1
UniProtKB - P62269 (RS18_HUMAN)
https://www.uniprot.org/uniprot/P62269
>sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK

UniProtKB - A6XGL2 (A6XGL2_HUMAN)
https://www.uniprot.org/uniprot/A6XGL2
>tr|A6XGL2|A6XGL2_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED
LQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN

UniProtKB - P04745 (AMY1_HUMAN)
https://www.uniprot.org/uniprot/P04745
>sp|P04745|AMY1_HUMAN Alpha-amylase 1 OS=Homo sapiens OX=9606 GN=AMY1A PE=1 SV=2
MKLFWLLFTIGFCWAQYSSNTQQGRTSIVHLFEWRWVDIALECERYLAPKGFGGVQVSPP
NENVAIHNPFRPWWERYQPVSYKLCTRSGNEDEFRNMVTRCNNVGVRIYVDAVINHMCGN
AVSAGTSSTCGSYFNPGSRDFPAVPYSGWDFNDGKCKTGSGDIENYNDATQVRDCRLSGL
LDLALGKDYVRSKIAEYMNHLIDIGVAGFRIDASKHMWPGDIKAILDKLHNLNSNWFPEG
SKPFIYQEVIDLGGEPIKSSDYFGNGRVTEFKYGAKLGTVIRKWNGEKMSYLKNWGEGWG
FMPSDRALVFVDNHDNQRGHGAGGASILTFWDARLYKMAVGFMLAHPYGFTRVMSSYRWP
RYFENGKDVNDWVGPPNDNGVTKEVTINPDTTCGNDWVCEHRWRQIRNMVNFRNVVDGQP
FTNWYDNGSNQVAFGRGNRGFIVFNNDDWTFSLTLQTGLPAGTYCDVISGDKINGNCTGI
KIYVSDDGKAHFSISNSAEDPFIAIHAESKL
*/
/*
>tr|A6XGL2|A6XGL2_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1
MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED
LQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN
 >sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK
>sp|P04745|AMY1_H>UMAN Alpha-amylase 1 OS=Homo sapiens OX=9606 GN=AMY1A PE=1 SV=2
MKLFWLLFTIGFCWAQYSSNTQQGRTSIVHLFEWRWVDIALECERYLAPKGFGGVQVSPP
NENVAIHNPFRPWWERYQPVSYKLCTRSGNEDEFRNMVTRCNNVGVRIYVDAVINHMCGN
AVSAGTSSTCGSYFNPGSRDFPAVPYSGWDFNDGKCKTGSGDIENYNDATQVRDCRLSGL
LDLALGKDYVRSKIAE>YMNHLIDIGVAGFRIDASKHMWPGDIKAILDKLHNLNSNWFPEG
SKPFIYQEVIDLGGEPIKSSDYFGNGRVTEFKYGAKLGTVIRKWNGEKMSYLKNWGEGWG
FMPSDRALVFVDNHDNQRGHGAGGASILTFWDARLYKMAVGFMLAHPYGFTRVMSSYRWP
RYFENGKDVNDWVGPPNDNGVTKEVTINPDTTCGNDWVCEHRWRQIRNMVNFRNVVDGQP
FTNWYDNGSNQVAFGRGNRGFIVFNNDDWTFSLTLQTGLPAGTYCDVISGDKINGNCTGI
KIYVSDDGKAHFSISNSAEDPFIAIHAESKL
*/
/*

MKLFWLLFTIGFCWAQYSSNTQQGRTSIVHLFEWRWVDIALECERYLAPKGFGGVQVSPP

NENVAIHNPFRPWWERYQPVSYKLCTRSGNEDEFRNMVTRCNNVGVRIYVDAVINHMCGN
AVSAGTSSTCGSYFNPGSRDFPAVPYSGWDFNDGKCKTGSGDIENYNDATQVRDCRLSGL

LDLALGKDYVRSKIAE>YMNHLIDIGVAGFRIDASKHMWPGDIKAILDKLHNLNSNWFPEG
SKPFIYQEVIDLGGEPIKSSDYFGNGRVTEFKYGAKLGTVIRKWNGEKMSYLKNWGEGWG

FMPSDRALVFVDNHDNQRGHGAGGASILTFWDARLYKMAVGFMLAHPYGFTRVMSSYRWP
RYFENGKDVNDWVGPPNDNGVTKEVTINPDTTCGNDWVCEHRWRQIRNMVNFRNVVDGQP
FTNWYDNGSNQVAFGRGNRGFIVFNNDDWTFSLTLQTGLPAGTYCDVISGDKINGNCTGI
KIYVSDDGKAHFSISNSAEDPFIAIHAESKL

*/
export default {
  name: 'pages.Index',
  data () {
    return {
      seq: '',
      showTip: false,
      showTutorial: true,
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
      ]
    }
  },
  storage: {
    keys: ['showTutorial'],
    namespace: 'protein-input'
  },
  validations: {
    seq: {
      maxLength: maxLength(50000),
      isProtein: isProtein()
    }
  },
  computed: {
    ...mapState('pfam', { isCreatePending: 'isCreatePending' }),
    pfamCurrent () {
      if (!this.$store.getters['pfam/current']) {
        return ''
      } else {
        return this.$store.getters['pfam/current'].predictions[0].classes
      }
    },
    seqCount () {
      // support 3 multi-sequence formats
      // case 1 standard fasta
      // case 2 no header single sequence
      // case 2 no header multi sequence
      // this.$debug(this.seq instanceof String) // always false
      // this.$debug(Object.prototype.toString.call(this.seq))
      // this.$debug(typeof this.seq) // 'string' or 'object'
      if (!this.seq || typeof this.seq !== 'string') {
        return 0
      }
      const seq = this.seq.trim()
      if (seq[0] === '>') {
        return seq.match(/^\s*>/gm).length
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
    seqLength () {
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
    seqHelper () {
      if (this.seqCount === 0) {
        return 'Enter a single protein sequence with or without a header'
      } else if (this.seqCount === 1) {
        return `1 sequence (${this.seqLength} aa)`
      } else {
        return `${this.seqCount} sequences (${this.seqLength} aa total)`
      }
    },
    predictLabel () {
      if (this.seqCount === 0) {
        return 'Submit'
      } else if (this.seqCount === 1) {
        return `Submit 1 sequence`
      } else {
        return `Submit ${this.seqCount} sequences`
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
        return [
          {
            header: '>PROTEIN_00001',
            seq: lines.join('')
          }
        ]
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
    // display tooltip after 5 secs
    setTimeout(() => {
      if (this.showTutorial === true) {
        this.showTip = true
      }
    }, 5000)
  },
  methods: {
    disableTutorial () {
      this.showTutorial = false
    },
    predict () {
      // this.$v.seq.$touch()
      if (!this.seq || this.$v.seq.$error) {
        this.$q.notify('Please enter a valid protein sequence')
        return
      }
      if (this.seqList.length > 1) {
        this.$q.notify('Due to limited resources, please submit only 1 sequence')
        return
      }
      const { Pfam } = this.$FeathersVuex
      const pfam = new Pfam(this.seqList[0])
      pfam.create()
      this.$ga.event('pfam', 'create', 'count', this.seqCount)
      this.$ga.event('pfam', 'create', 'length', this.seqLength)
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
      return fasta
        .split('\n')
        .slice(1)
        .map(line => line.trim().toUpperCase())
        .join('')
    },
    fastaLength (fasta) {
      return this.fastaLine(fasta).length
    },
    loadSeq (fasta) {
      // console.log(fasta)
      this.seq =
        '>PROTEIN_00001\n' +
        fasta
          .split('\n')
          .slice(1)
          .map(line => line.trim().toUpperCase())
          .join('\n')
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
            // this.$debug(type, vState.$params[type]) // isProtein {type: "isProtein"}
            return this.$t(type, vState.$params[type])
          }
        }
      }
    }
  }
}
</script>
