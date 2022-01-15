import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
    plugins: [envCompatible({ prefix: 'VITE_APP' }), react(), tsconfigPaths()],
});
