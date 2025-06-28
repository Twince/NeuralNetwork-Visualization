class PathTrackingCanvas {
    constructor() {
        // this.strokeCanvas = document.createElement("canvas");
        this.strokeCanvas = document.getElementById('processingCanvas')
        this.strokeCtx = this.strokeCanvas.getContext('2d', { willReadFrequently: true });
        this.alignCanvas = document.getElementById('alignCanvas');
        // this.alignCanvas = document.createElement('canvas');
        this.alignCtx = this.alignCanvas.getContext('2d', { willReadFrequently: true }) ;
        this.originCanvasCenter = {};
    }

    setupCanvas({width, height}) {
        this.strokeCanvas.width = this.alignCanvas.width =  width;
        this.strokeCanvas.height = this.alignCanvas.height =  height;
        this.canvasCenter = {x: width / 2, y: height / 2};

        this.strokeCtx.lineWidth = 20;
        this.strokeCtx.lineCap = "round";
        this.strokeCtx.lineJoin = 'round';

        this.alignCanvas.style.border = '2px solid red'; // 눈에 보이게
    }

    alignToCenter({minX, maxX, minY, maxY}) {
        console.log("클리어 실행")
        this.alignCtx.fillStyle = 'rgba(255,255,255)';
        this.alignCtx.fillRect(0, 0, this.alignCanvas.width, this.alignCanvas.height);
        const original = {
            x: minX-20,
            y: minY-20,
            width: maxX+40 - minX,
            height: maxY+40 - minY
        }
        const alignStartPosition= {
            x: this.canvasCenter.x - original.width / 2,
            y: this.canvasCenter.y - original.height / 2,
        }
        this.alignCtx.drawImage(this.strokeCanvas, original.x, original.y,
            original.width, original.height,
            alignStartPosition.x, alignStartPosition.y,
            original.width, original.height);
    }
}

export default PathTrackingCanvas;