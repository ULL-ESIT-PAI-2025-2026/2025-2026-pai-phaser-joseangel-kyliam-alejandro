/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Jose Angel Portillo Garcia
 * @since April 25, 2026
 * @description Vite configuration tailored to the specific project directory structure.
 */

import {defineConfig} from 'vite';
import {resolve} from 'node:path';

export default defineConfig({
  base: '/2025-2026-pai-phaser-joseangel-kyliam-alejandro/',
  publicDir: 'public',

  build: {
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        platformGame: resolve(__dirname, 'src/platform-game/platform-game.html'),
        tutorial: resolve(__dirname, 'src/tutorial/tutorial.html'),
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },

  server: {
    port: 8080,
    open: 'true',
    host: true,
  },
});