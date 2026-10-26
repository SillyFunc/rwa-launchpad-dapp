import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // 默认的 localhost 在部分机器上只会绑定 IPv6 的 ::1，浏览器走 127.0.0.1 时连接被拒
    host: '127.0.0.1',
    port: 8082,
  },
})
