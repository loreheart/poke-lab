import { vi } from 'vitest'

export const mockRoute = {
  params: {
    id: 1
  },
  fullPath: ''
}

export const mockRouter = {
  push: vi.fn(),
  resolve: vi.fn(),
}
