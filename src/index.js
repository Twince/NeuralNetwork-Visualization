import { initializeCanvas } from './view/canvas.js';
import trainTester from "../dev/train/trainTester.js";

trainTester();
document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
});