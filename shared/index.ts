// Shared data and utilities for both client and server

// API routes - single source of truth
export const API_ROUTES = {
  health: '/api/health',
} as const

// App configuration
export const APP_CONFIG = {
  appName: 'Verba',
  defaultPort: 3000,
} as const

export default APP_CONFIG;

// Shared types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface HealthStatus {
  status: 'ok' | 'error'
}

// Shared utilities
export function formatApiError(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unknown error occurred'
}
