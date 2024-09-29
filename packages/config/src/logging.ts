import { configure, getConsoleSink } from '@logtape/logtape'

const isDevelopment = process.env.NODE_ENV === 'development'

export function configureLogging() {
  configure({
    sinks: {
      console: getConsoleSink(),
    },
    loggers: [
      {
        category: ['deepdish'],
        sinks: isDevelopment ? ['console'] : [],
        level: isDevelopment ? 'debug' : 'info',
      },
    ],
  })
}
