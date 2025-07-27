import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',  // 기본값, 생략 가능
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
