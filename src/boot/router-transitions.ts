import { defineBoot } from '#q-app/wrappers'

const pages = ['index', 'about', 'how-it-works', 'contact']
const order = pages.reduce(
  (acc, page, index) => {
    acc[page] = index
    return acc
  },
  {} as Record<string, number>,
)

export default defineBoot(({ router }) => {
  router.afterEach((to, from) => {
    // console.log('to', to.name, order[to.name as string])
    // console.log('from', from.name, order[from.name as string])
    if (to.name && to.name in order && from.name && from.name in order) {
      to.meta.transition =
        (order[to.name as string] || 0) < (order[from.name as string] || 0)
          ? 'slide-right'
          : 'slide-left'
    } else {
      to.meta.transition = 'fade'
    }
  })
})
