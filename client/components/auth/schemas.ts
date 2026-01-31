import type { JSONSchemaType } from 'ajv'

export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  name: string
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
    name: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'Name is required' },
    },
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
  required: ['name', 'email', 'password'],
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
