export const mockRoute = {
  params: {
    id: 1
  },
  fullPath: ''
}

export const mockRouter = {
  push: () => {}
}

export const routeGlobalsWithRouting = {
  global: {
    mocks: {
      $route: mockRoute,
      $router: mockRouter
    }
  }
}