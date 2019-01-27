<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
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
            :helper="seqHelper"
            :error="$v.seq.$error"
            :error-label="errorMessages($v.seq)"
          >
            <q-input
              v-model="seq"
              clearable
              autofocus
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
    <!-- <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    /> -->
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
  name: 'PageIndex',
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
      this.seq = fasta
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
