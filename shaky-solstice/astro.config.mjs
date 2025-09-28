// import { defineConfig } from 'astro/config';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   vite: {
//     plugins: [tailwindcss()],
//     define: {
//       global: 'globalThis',
//     },
//     optimizeDeps: {
//       include: ['jquery', 'datatables.net']
//     }
//   },
// });

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node'; // <--- tambahin ini

export default defineConfig({
  output: 'server', // <--- wajib kalau mau SSR
  adapter: node({ mode: 'standalone' }), // atau "middleware"
  vite: {
    plugins: [tailwindcss()],
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      include: ['jquery', 'datatables.net'],
    },
  },
});
