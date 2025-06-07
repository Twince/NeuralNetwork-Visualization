class ProcessingCanvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        // this.canvas = document.getElementById('processingCanvas')
        this.ctx = this.canvas.getContext('2d');
    }

    setupCanvas({width, height}) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx.lineWidth = 20;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
        console.log("processingCanvas.setupCanvas");
    }
}

export default ProcessingCanvas;