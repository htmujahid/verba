import * as z from 'zod'

export const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type SignInFormData = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignUpFormData = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const totpSchema = z.object({
  code: z.string().length(6).regex(/^\d{6}$/, 'Please enter a valid 6-digit code'),
})

export type TotpFormData = z.infer<typeof totpSchema>

export const otpSchema = z.object({
  code: z.string().length(6).regex(/^\d{6}$/, 'Please enter a valid 6-digit OTP'),
})

export type OtpFormData = z.infer<typeof otpSchema>
