import { type App, createApp } from 'vue'

export function withSetup<T>(composable: () => T): [T, App] {
  let result: T
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  // @ts-expect-error
  return [result, app]
}
