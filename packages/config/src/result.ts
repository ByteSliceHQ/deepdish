import type { Result } from '@deepdish/types/result'

type ConfigFailure =
  | { type: 'CONTRACT_MISSING'; contract: string }
  | { type: 'INITIALIZED' }
  | { type: 'UNINITIALIZED' }

export type ConfigResult<T> = Result<T, ConfigFailure>
