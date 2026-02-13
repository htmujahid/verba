import type { JSONSchemaType } from 'ajv'

export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  password: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
}

export const signInSchema: JSONSchemaType<SignInFormData> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
      errorMessage: { format: 'Please enter a valid email address' },
    },
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'Password is required' },
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

export const signUpSchema: JSONSchemaType<SignUpFormData> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
      errorMessage: { format: 'Please enter a valid email address' },
    },
    password: {
      type: 'string',
      minLength: 8,
      errorMessage: { minLength: 'Password must be at least 8 characters' },
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

export const forgotPasswordSchema: JSONSchemaType<ForgotPasswordFormData> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
      errorMessage: { format: 'Please enter a valid email address' },
    },
  },
  required: ['email'],
  additionalProperties: false,
}

export const resetPasswordSchema: JSONSchemaType<ResetPasswordFormData> = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 8,
      errorMessage: { minLength: 'Password must be at least 8 characters' },
    },
  },
  required: ['password'],
  additionalProperties: false,
}

export interface TotpFormData {
  code: string
}

export const totpSchema: JSONSchemaType<TotpFormData> = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      minLength: 6,
      maxLength: 6,
      pattern: '^\\d{6}$',
      errorMessage: { pattern: 'Please enter a valid 6-digit code' },
    },
  },
  required: ['code'],
  additionalProperties: false,
}

export interface OtpFormData {
  code: string
}

export const otpSchema: JSONSchemaType<OtpFormData> = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      minLength: 6,
      maxLength: 6,
      pattern: '^\\d{6}$',
      errorMessage: { pattern: 'Please enter a valid 6-digit OTP' },
    },
  },
  required: ['code'],
  additionalProperties: false,
}
