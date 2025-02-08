import {
  configure,
  getAnsiColorFormatter,
  getConsoleSink,
} from '@logtape/logtape'

export async function configureLogging(enabled: boolean) {
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
        sinks: enabled ? ['console'] : [],
        level: 'warning',
      },
      {
        category: ['deepdish'],
        sinks: enabled ? ['console'] : [],
        level: enabled ? 'debug' : null,
      },
    ],
  })
}
