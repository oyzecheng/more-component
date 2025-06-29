import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      resolvers: [ArcoResolver()]
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    }),
    vitePluginForArco({
      style: 'css'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
