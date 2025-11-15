import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repo = 'NeuralNetwork-Visualization';
const branch = process.env.GITHUB_REF_NAME || '';
let base = `/${repo}/`;

if (branch.startsWith('feat/')) {
    base = './';
}

export default defineConfig({
    base: base,
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
