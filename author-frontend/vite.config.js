import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'dompurify',
        'prop-types',
        'react-router-dom',
        '@mdi/js',
        '@mdi/react',
        'jwt-decode',
        '@tinymce/tinymce-react',
        'jsonwebtoken'
      ],
      output: {
        globals: {
          'dompurify': 'DOMPurify',
          'prop-types': 'PropTypes',
          'react-router-dom': 'ReactRouterDOM',
          '@mdi/js': 'mdiJs',
          '@mdi/react': 'mdiReact',
          'jwt-decode': 'jwtDecode',
          '@tinymce/tinymce-react': 'TinyMCE',
          'jsonwebtoken': 'jwt'
        }
      }
    }
  }
});