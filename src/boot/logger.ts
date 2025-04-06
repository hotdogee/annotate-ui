import { defineBoot } from '#q-app/wrappers'
import Logger from 'assets/logger'
const logger = new Logger()
const levels = ['debug', 'log', 'warn', 'error', 'info']
const loggers: Record<string, (...msg: unknown[]) => void> = {}
export default defineBoot(({ app }) => {
  levels.forEach((level) => {
    app.config.globalProperties['$' + level] = function (...msg: unknown[]) {
      const prefix: string = this.$options.__file
        ? this.$options.__file.replace(/^src\/|\.vue$/gi, '').replace(/\//gi, '.')
        : this.$options.name || this.$vnode.tag
      logger[level as keyof typeof logger](prefix || 'component', ...msg)
    }
    loggers[level] = app.config.globalProperties['$' + level]
  })
})

// Export all loggers individually
export const { debug, log, warn, error, info } = loggers
