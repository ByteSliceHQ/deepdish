#!/usr/bin/env bun

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

function removeWorkspacePrefixes(packageJsonPath: string) {
  const data = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  const depFields = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ]

  let changed = false
  for (const field of depFields) {
    if (data[field]) {
      for (const pkgName of Object.keys(data[field])) {
        const versionString = data[field][pkgName]
        if (
          typeof versionString === 'string' &&
          versionString.startsWith('workspace:')
        ) {
          data[field][pkgName] = versionString.replace(/^workspace:/, '')
          changed = true
        }
      }
    }
  }

  if (changed) {
    writeFileSync(packageJsonPath, JSON.stringify(data, null, 2))
    console.log(`Updated ${packageJsonPath}`)
  }
}

function processDirectory(dir: string) {
  const packageJsonPath = join(dir, 'package.json')
  try {
    statSync(packageJsonPath)
    removeWorkspacePrefixes(packageJsonPath)
  } catch {
    // No package.json in this directory or can't read it
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('.') &&
      !entry.name.startsWith('node_modules') &&
      !entry.name.startsWith('apps')
    ) {
      processDirectory(join(dir, entry.name))
    }
  }
}

const rootDir = process.argv[2] || '.'
processDirectory(resolve(rootDir))
