import { configure, getConsoleSink } from '@logtape/logtape'

const isDevelopment = process.env.NODE_ENV === 'development'

export async function configureLogging() {
  await configure({
    sinks: {
      console: getConsoleSink(),
    },
    loggers: [
      {
        category: ['logtape', 'meta'],
        sinks: isDevelopment ? ['console'] : [],
        level: 'warning',
      },
      {
        category: ['deepdish'],
        sinks: isDevelopment ? ['console'] : [],
        level: isDevelopment ? 'debug' : 'info',
      },
    ],
  })
}
