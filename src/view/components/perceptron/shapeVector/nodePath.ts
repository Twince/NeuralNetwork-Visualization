import { INodePath } from '@/view/components/perceptron/shape/types/nodePath.ts';

export const nodePath = (
    ctx: CanvasRenderingContext2D,
    { x, y, width, height, radius = 6, angleOffset, percent }: INodePath,
) => {
    const node: Path2D = roundedRect(-width / 2, -height / 2, width, height, radius);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleOffset * Math.PI) / 180); // atan값이 반환하는 라디안 값을 degree로 변환

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.fill(node);
    ctx.stroke(node);

    if (percent > 0) {
        const filledHeight = (height * percent) / 100;

        const fillPath = roundedRect(-width / 2, -height / 2, filledHeight, height, radius);
        ctx.save();
        ctx.clip(node);
        ctx.fillStyle = '#000';
        ctx.fill(fillPath);
        ctx.restore();
    }

    ctx.restore();
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
