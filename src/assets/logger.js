const GREY = `#7f8c8d`
const GREEN = `#2ecc71`
const YELLOW = `#f39c12`
const RED = `#c0392b`
const BLUE = `#3498db`
// const BLACK = `#111111`

const levelToColor = {
  debug: GREY,
  log: BLUE,
  warn: YELLOW,
  error: RED,
  info: GREEN
}

const APP_NAME = `annotate`
const APP_COLOR = `#205b13`

// console.log('process.env', process.env)

class Logger {
  constructor (prefix) {
    this.prefix = prefix
    Object.keys(levelToColor).forEach(level => {
      this[level] = (...args) => {
        if (process.env.NODE_ENV !== `development`) {
          return
        }
        this._print(
          this.prefix || args[0],
          level,
          this.prefix ? args : args.slice(1),
          levelToColor[level]
        )
      }
    })
  }
  _print (prefix, level, logArgs, levelColor) {
    const logPrefix = [
      `%c${APP_NAME}` + `%c${prefix}`,
      `background: ${APP_COLOR}; color: white; padding: 2px 0.5em; border-radius: 0.5em 0em 0em 0.5em;`,
      `background: ${levelColor}; color: white; padding: 2px 0.5em; border-radius: 0em 0.5em 0.5em 0em;`
    ]
    // eslint-disable-next-line no-console
    console[level](...logPrefix, ...logArgs)
  }
}
export default Logger
