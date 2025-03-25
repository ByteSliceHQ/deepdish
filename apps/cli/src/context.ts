import fs from 'node:fs'
import fsPromise from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import type { StricliAutoCompleteContext } from '@stricli/auto-complete'
import type { CommandContext } from '@stricli/core'

export interface LocalContext
  extends CommandContext,
    StricliAutoCompleteContext {
  readonly process: NodeJS.Process
  readonly fsPromise: typeof fsPromise
}

export function buildContext(process: NodeJS.Process): LocalContext {
  return {
    fs,
    // NB: separate `fsPromise` needed in order to satisfy `LocalContext` interface
    fsPromise,
    os,
    path,
    process,
  }
}
