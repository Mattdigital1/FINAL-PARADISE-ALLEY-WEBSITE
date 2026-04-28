import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        bowling: resolve(__dirname, 'bowling.html'),
        menu:    resolve(__dirname, 'menu.html'),
        events:  resolve(__dirname, 'events.html'),
        leagues: resolve(__dirname, 'leagues.html'),
        visit:   resolve(__dirname, 'visit.html'),
      }
    }
  }
})
