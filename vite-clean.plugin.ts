// @ts-nocheck
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
export default function (): Plugin {
  return {
    name: 'clean-plugin',
    closeBundle() {
      fs.rm(path.resolve(__dirname, 'dist/types/node'), { recursive: true })
      fs.rm(path.resolve(__dirname, 'dist/types/dom'), { recursive: true })
    },
  }
}
