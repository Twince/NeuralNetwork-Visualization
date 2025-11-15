class CanvasComponentBase {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!canvasId) {
            throw new Error(`Canvas element "${canvasId}" not found.`);
        }
        this.ctx = this.canvas.getContext('2d');
        this.isMounted = false;
    }

    mount() {
        if (this.isMounted) return;
        this.setup();
        this.isMounted = true;
    }

    unMount() {
        this.clear();
        this.isMounted = false;
    }

    setup() {
        // extends from sub class
    }

    update(state) {
        throw new Error('update must be implemented from subclass.');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default CanvasComponentBase;
