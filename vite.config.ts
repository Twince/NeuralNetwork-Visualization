import { defineConfig } from 'vite';

export default defineConfig({
    root: './src',
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    publicDir: 'public',
    build: {
        outDir: 'dist',
        target: 'esnext',
    },
    server: {
        port: 5173,
        open: true,
    },
});
