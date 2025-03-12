import mitt from 'mitt'

export type Events = {
  edit: {
    contract: string
    key: string
  }
}

export function makeEmitter() {
  return mitt<Events>()
}
