import { z } from 'zod'

export const AdminUserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date().readonly(),
  updatedAt: z.coerce.date().readonly(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  restrictLocationId: z.string().uuid().nullish(),
  locationName: z.string().nullish().readonly(),
  isBlocked: z.boolean(),
  lastPasswordChange: z.coerce.date().nullish().readonly(),
  lastLogin: z.coerce.date().nullish().readonly(),
  restricted: z.boolean(),
})

export type AdminUser = z.infer<typeof AdminUserSchema>

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  totp: z.string().length(6).regex(/^\d{6}$/).optional(),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const LoginResponseSchema = z.object({
  sessionId: z.string().uuid(),
  user: AdminUserSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
