import { z } from 'zod'

export const audioSchema = z.object({
  fallback: z.string().optional(),
  source: z.string().optional(),
})

export type AudioValue = z.infer<typeof audioSchema>

export const imageSchema = z.object({
  description: z.string().optional(),
  source: z.string().optional(),
  title: z.string().optional(),
})

export type ImageValue = z.infer<typeof imageSchema>

export const linkSchema = z.object({
  destination: z.string().optional(),
  href: z.string().optional(),
  title: z.string().optional(),
})

export type LinkValue = z.infer<typeof linkSchema>

export const typographySchema = z.string()

export type TypographyValue = z.infer<typeof typographySchema>

export const videoSchema = z.object({
  fallback: z.string().optional(),
  source: z.string().optional(),
})

export type VideoValue = z.infer<typeof videoSchema>
