import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'BmRenderer',
      fileName: (format) => `bm-renderer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'uuid', /@bamboo-code\/*/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@bamboo-code/components': 'BmComponents',
        },
      },
    },
  },
});
