<template>
  <q-page padding>
    <div class="row justify-center">
      <img class="center" alt="ANNotate logo" src="~assets/annotate-logo-long-282x92.png">
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-10 col-lg-8">
        <div class="row no-wrap q-field-floating">
          <q-icon
            name="keyboard_arrow_right"
            color="secondary"
            class="col-auto q-field-icon q-field-margin"
          >
            <q-popover>
              <q-list link class="scroll" style="min-width: 100px; max-width: 90vw;">
                <q-list-header>Recent Submissions</q-list-header>
                <q-item-separator />
                <q-list-header>Example Proteins</q-list-header>
                <q-item
                  v-for="seq in exampleSeqs"
                  :key="seq"
                  v-close-overlay
                  @click.native="notify"
                >
                  <q-item-main
                    :label="seqId(seq)"
                    label-lines="1"
                    :sublabel="seqDescription(seq)"
                    sublabel-lines="1"
                  />
                  <q-item-side right>
                    <q-item-tile stamp>{{ seqLength(seq) }} aa</q-item-tile>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-popover>
          </q-icon>
          <q-field
            id="protein-field"
            class="col q-subheading"
            label=""
            helper="Enter a single protein sequence with or without a header"
            :error="$v.seq.$error"
            :error-label="errorMessages($v.seq)"
          >
            <q-input
              v-model="seq"
              clearable
              autofocus
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
        label="Predict"
        color="primary"
        @click='predict'
      />
    </div>
    <q-input
      v-model="pfamCurrent"
      float-label="Results"
      type="textarea"
    />
  </q-page>
</template>

<style lang="stylus">
#protein-field .q-input
  font-family monospace
//   height 200px
// .q-layout-page > .row + .row
#predict
  margin-top 1.5rem
</style>

<script>
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
export default {
  name: 'PageIndex',
  data () {
    return {
      seq: '',
      exampleSeqs: [
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
  computed: {
    pfamCurrent () {
      if (!this.$store.getters['pfam/current']) {
        return ''
      } else {
        return this.$store.getters['pfam/current'].predictions[0].classes
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
      const { Pfam } = this.$FeathersVuex
      const pfam = new Pfam({seq: this.seq})
      pfam.create()
    },
    seqId (seq) {
      /*
      let seq = `>tr|A6XGL2|A6XGL2_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1
 mALWMRLLPLLALLaLWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED
LQGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN `
*/
      return this.seqHeader(seq).split(' ')[0]
    },
    seqHeader (seq) {
      return seq.split('\n')[0].trim()
    },
    seqDescription (seq) {
      return this.seqHeader(seq).substring(this.seqId(seq).length)
    },
    seqLine (seq) {
      return seq.split('\n').slice(1).map(line => line.trim().toUpperCase()).join('')
    },
    seqLength (seq) {
      return this.seqLine(seq).length
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
