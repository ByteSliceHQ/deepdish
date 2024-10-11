import {
  configure,
  getAnsiColorFormatter,
  getConsoleSink,
} from '@logtape/logtape'

const isDevelopment = process.env.NODE_ENV === 'development'

export async function configureLogging() {
  await configure({
    sinks: {
      console: getConsoleSink({
        formatter: getAnsiColorFormatter({
          level: 'full',
          levelStyle: 'italic',
        }),
      }),
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
