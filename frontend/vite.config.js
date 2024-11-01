import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // base: '/',
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     external: ['@mdi/js', '@mdi/react'],
  //     output: {
  //       globals: {
  //         '@mdi/js': 'mdiJs',
  //         '@mdi/react': 'mdiReact',
  //       },
  //     },
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       'react',
  //       'react-dom',
  //       'react-router-dom',
  //       'dompurify',
  //       'prop-types',
  //       '@mdi/js',
  //       '@mdi/react',
  //       'jwt-decode',
  //       'masonry-layout',
  //       'isomorphic-dompurify',
  //       '@tinymce/tinymce-react',
  //     ],
  //     output: {
  //       globals: {
  //         'react': 'React',
  //         'react-dom': 'ReactDOM',
  //         'react-router-dom': 'ReactRouterDOM',
  //         'dompurify': 'DOMPurify',
  //         'prop-types': 'PropTypes',
  //         '@mdi/js': 'mdiJs',
  //         '@mdi/react': 'mdiReact',
  //         'jwt-decode': 'jwtDecode',
  //         'masonry-layout': 'Masonry',
  //         'isomorphic-dompurify': 'isomorphicDOMPurify',
  //         '@tinymce/tinymce-react': 'Editor',
  //       },
  //     },
  //   },
  // },
});
