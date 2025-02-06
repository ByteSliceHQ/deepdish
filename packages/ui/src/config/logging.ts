import {
  configure,
  getAnsiColorFormatter,
  getConsoleSink,
} from '@logtape/logtape'

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
        sinks: ['console'],
        level: 'warning',
      },
      {
        category: ['deepdish'],
        sinks: ['console'],
        level: 'debug',
      },
    ],
  })
}
