import eventBus from "../../controller/EventBus.js";
import { DATA_EVENTS } from "../../controller/constants/events.js";
import CanvasComponentBase from "../CanvasComponentBase.js";

class UserInputHandler extends CanvasComponentBase{
    // touch event 위치 계산
    getTouchPosition = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        return {x, y};
    }

    drawCircle = (x, y) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // canvas initialize
    setup() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight/3;
        this.isDrawing = false;

        this.ctx.fillStyle = 'rgba(40,40,40)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        this.ctx.lineWidth = 20;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';

        for(let x=5; x<this.canvas.width; x += 13){
            for(let y=5; y<this.canvas.height; y += 13){
                console.log("dot");
                this.drawCircle(x,y);
            }
        }

        // click, touch event
        this.canvas.addEventListener("mousedown", (e) => {
            this.startDraw(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener("touchstart", (e) => {
            let {x, y} = this.getTouchPosition(e);
            this.startDraw(x, y);
        });

        // drag event
        this.canvas.addEventListener("mousemove", (e) => {
            this.draw(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener("touchmove", (e) => {
            let {x, y} = this.getTouchPosition(e);
            this.draw(x, y);
        });

        // click, touch end event
        this.canvas.addEventListener("mouseup", this.endDraw);
        this.canvas.addEventListener("mouseout", this.endDraw);
        this.canvas.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.endDraw();
        });
        console.log("✅ Canvas initialized.");
    }

    startDraw = (x, y) => {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    draw = (x, y) => {
        if (!this.isDrawing) return;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    endDraw = () => {
        this.isDrawing = false;
    }

    clear = () => {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default UserInputHandler;