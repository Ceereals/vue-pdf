import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import vue from '@vitejs/plugin-vue'
const { plugins, ...config } = viteConfig
export default mergeConfig(
  config,
  defineConfig({
    plugins: [vue()],
    test: {
      workspace: ['tests/*'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: [
          'coverage/**',
          'dist/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/*.d.ts',
          '**/virtual:*',
          '**/__x00__*',
          '**/\x00*',
          'cypress/**',
          'test?(s)/**',
          'test?(-*).?(c|m)[jt]s?(x)',
          '**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
          '**/vitest.{workspace,projects}.[jt]s?(on)',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
          'react-pdf',
          'plugins',
          'devtools',
        ],
      },
    },
  }),
)
