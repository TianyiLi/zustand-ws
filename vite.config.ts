import * as reactPlugin from 'vite-plugin-react'
import type { UserConfig } from 'vite'
import './src/socket-server'

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  optimizeDeps: {
    include: ['zustand/middleware', 'zustand/shallow']
  }
}

export default config
