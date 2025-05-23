/**
 * `ink-table` (https://github.com/maticzav/ink-table)
 * deserves credit for some inspiration and code behind
 * this `Table` component. This has been heavily modified
 * and simplified for our use case.
 */

import { Box, Text } from 'ink'
import { Fragment } from 'react'

type Data = Record<string, unknown>

type Cell<T extends Data> = {
  column: Column<T>
  value: React.ReactNode
}

type Column<T extends Data> = {
  name: string
  key: keyof T
  width: number
}

function parseCellValue(value: unknown) {
  if (typeof value === 'boolean') {
    if (value) {
      return (
        <>
          <Text color="green">✔</Text> yes
        </>
      )
    }

    return 'no'
  }

  return String(value)
}

function makeCells<T extends Data>(data: T, columns: Column<T>[]): Cell<T>[] {
  return columns.map((column) => {
    const value = column.key in data ? parseCellValue(data[column.key]) : null

    return {
      column,
      value,
    }
  })
}

function makeColumns<T extends Data>(
  data: T[],
  keys: (keyof T)[],
  padding = 1,
): Column<T>[] {
  return keys.map((key) => {
    const headerLength = String(key).length

    const lengths = data.map((row) => {
      if (key in row) {
        if (typeof row[key] === 'string' || typeof row[key] === 'number') {
          return String(row[key]).length
        }
      }

      return 0
    })

    const width = Math.max(...lengths, headerLength) + padding * 2

    return {
      name: String(key),
      key,
      width,
    }
  })
}

function Separator(props: {
  width: number
}) {
  return <Text>{Array(props.width).fill('─').join('')}</Text>
}

export function Table<T extends Data>(props: {
  keys: (keyof T)[]
  data: T[]
}) {
  const columns = makeColumns(props.data, props.keys)
  const totalWidth = columns.reduce((acc, column) => acc + column.width, 0)

  return (
    <Box flexDirection="column" width={totalWidth}>
      <Separator width={totalWidth} />
      <Box flexDirection="row">
        {columns.map((column) => (
          <Box key={column.name} width={column.width}>
            <Text bold color="blue">
              {column.name}
            </Text>
          </Box>
        ))}
      </Box>
      <Separator width={totalWidth} />
      <Box flexDirection="column">
        {props.data.map((row, index) => {
          const cells = makeCells(row, columns)

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: using the index for a key is viable here
            <Fragment key={`row-${index}`}>
              <Box flexDirection="row">
                {cells.map((cell) => (
                  <Box key={cell.column.name} width={cell.column.width}>
                    <Text>{cell.value}</Text>
                  </Box>
                ))}
              </Box>
              <Separator width={totalWidth} />
            </Fragment>
          )
        })}
      </Box>
    </Box>
  )
}
