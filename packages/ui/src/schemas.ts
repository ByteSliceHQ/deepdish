import type { Value } from '@deepdish/core/schema'
import * as v from 'valibot'

export const audioSchema = v.object({
  fallback: v.optional(v.string()),
  source: v.optional(v.string()),
})

export type AudioValue = Value<typeof audioSchema>

export const imageSchema = v.object({
  description: v.optional(v.string()),
  source: v.optional(v.string()),
  title: v.optional(v.string()),
})

export type ImageValue = Value<typeof imageSchema>

export const linkSchema = v.object({
  destination: v.optional(v.string()),
  href: v.optional(v.string()),
  title: v.optional(v.string()),
})

export type LinkValue = Value<typeof linkSchema>

export const typographySchema = v.string()

export type TypographyValue = Value<typeof typographySchema>

export const videoSchema = v.object({
  fallback: v.optional(v.string()),
  source: v.optional(v.string()),
})

export type VideoValue = Value<typeof videoSchema>
