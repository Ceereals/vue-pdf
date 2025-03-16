// @ts-nocheck
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
export default function (): Plugin {
  return {
    name: 'clean-plugin',
    closeBundle() {
      fs.rm(
        path.resolve('./dist/types/node'),
        { recursive: true },
        () => void 0,
      )
      fs.rm(path.resolve('./dist/types/dom'), { recursive: true }, () => void 0)
    },
  }
}
