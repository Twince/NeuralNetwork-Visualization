import { INodePath } from '@/view/components/perceptron/shape/types/nodePath.ts';

export const nodePath = (
    ctx: CanvasRenderingContext2D,
    { x, y, width, height, radius = 8, percent }: INodePath,
) => {
    const node: Path2D = roundedRect(x, y, width, height, radius);

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.fill(node);
    ctx.stroke(node);

    if (percent > 0) {
        const filledHeight = (height * percent) / 100;
        const fillY = y + height - filledHeight;

        const fillPath = roundedRect(x, fillY, width, filledHeight, radius);
        ctx.save();
        ctx.clip(node);
        ctx.fillStyle = '#000';
        ctx.fill(fillPath);
        ctx.restore();
    }
};

const roundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
): Path2D => {
    const path = new Path2D();
    const r = Math.min(radius, width / 2, height / 2);

    path.moveTo(x + r, y);
    path.lineTo(x + width - r, y);
    path.quadraticCurveTo(x + width, y, x + width, y + r);
    path.lineTo(x + width, y + height - r);
    path.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    path.lineTo(x + r, y + height);
    path.quadraticCurveTo(x, y + height, x, y + height - r);
    path.lineTo(x, y + r);
    path.quadraticCurveTo(x, y, x + r, y);

    return path;
};
