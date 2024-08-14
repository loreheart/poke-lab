import { vi } from 'vitest'

export const mockRoute = {
  params: {
    id: 1
  }
}

export const mockRouter = {
  push: vi.fn(),
  resolve: vi.fn(),
}
