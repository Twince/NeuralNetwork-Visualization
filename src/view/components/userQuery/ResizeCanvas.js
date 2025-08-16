class ResizeCanvas {
    constructor() {
        this.canvas = document.getElementById("resizeCanvas");
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.canvas.width = this.canvas.height = 28;
    }

    downScale(path) {
        this.ctx.fillStyle = 'rgba(255,255,255)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(path, 0, 0, path.width, path.height, 0, 0, this.canvas.width, this.canvas.height);
    }
}

export default ResizeCanvas;