import { defineBoot } from '#q-app/wrappers'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'

export default defineBoot(({ app }) => {
  app.component(QMarkdown.name ?? 'QMarkdown', QMarkdown)
  // app.config.compilerOptions.whitespace = 'preserve'
})
