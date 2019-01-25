import { helpers } from 'vuelidate/lib/validators'

// const apiErrors = (field) => helpers.withParams(
//   { type: 'apiErrors', value: field },
//   (value) => {
//     logger.log(`apiErrors.this = ${this}`)
//     // logger.log(`apiErrors.vm = `, vm)
//     return this ? !!this.errors[field] : this
//   }
// )
// const apiErrors2 = (field) => (value) => {
//   logger.log(`apiErrors.this = ${this}`)
//   // logger.log(`apiErrors.vm = `, vm)
//   return this ? !!this.errors[field] : this
// }
export function apiErrors (field) {
  // logger.log(`apiErrors.this = `, this)
  return helpers.withParams(
    { type: 'apiErrors', field: field },
    function (value, vm) {
      // logger.log(`apiErrors->this = `, this)
      // logger.log(`apiErrors->this.errors = `, this.errors)
      // logger.log(`apiErrors.vm = `, vm)
      // // return false if there is an error
      // if (this.$v[field].$dirty) {
      //   return true
      // }
      if (vm.errors[field]) {
        vm.$v[field].$touch()
        return false
      } else {
        return true
      }
    }
  )
}

const proteinRe = /^[FLIMVPAWGSTYQNCO*UHKRDEBZX-]+$/
/*
>sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK
*/
export function isProtein () {
  // logger.log(`apiErrors.this = `, this)
  return helpers.withParams(
    { type: 'isProtein' },
    function (value, vm) {
      //       let value =`MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
      // EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
      //  RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK`
      //       let value2 =`>sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
      // MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
      // EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
      // RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK`
      //       let value3 =`>sp|P62269|RS18_HUMAN 40S ribosomal protein S18 OS=Homo sapiens OX=9606 GN=RPS18 PE=1 SV=3
      // MSLVIPEKFQHILRVLNTNIDGRRKIAFAITAIKGVGRRYAHVVLRKADIDLTKRAGELT
      // EDEVERVITIMQNPRQYKIPDWFLNRQKDVKDGKYSQVLANGLDNKLREDLERLKKIRAH
      // RGLRHFWGLRVRGQHTKTTGRRGRTVGVSKKK
      // `
      return value.split('\n').every(line => {
        line = line.trim().toUpperCase()
        console.log('isProtein', line)
        return !line || (line[0] === '>') || proteinRe.test(line)
      })
    }
  )
}
