import { IResizeCanvas, ICanvasBase } from '@/view/components/userQuery/types/canvas';

export const pixelExtractor = (path: IResizeCanvas & ICanvasBase) => {
    const pathToMatrix = (width: number, height: number, data: Uint8ClampedArray): object[] => {
        return Array.from(
            { length: height },
            (_: unknown, y: number): { r: number; g: number; b: number; a: number }[] => {
                return Array.from(
                    { length: width },
                    (_: unknown, x: number): { r: number; g: number; b: number; a: number } => {
                        const i: number = (y * width + x) * 4;
                        const [r, g, b, a] = data.slice(i, i + 4);
                        return { r, g, b, a };
                    },
                );
            },
        );
    };

    const grayscaleMatrix = (matrixRGB: object[]): number[] => {
        return matrixRGB.flatMap((pixelObject: object[]) =>
            pixelObject.map((v: { r: number; g: number; b: number; a: number }): number => {
                const RGB_sum: number = v.r + v.g + v.b;
                return Math.round(RGB_sum / 3);
            }),
        );
    };

    const normalize = (grayscaleMatrix: number[]): number[] => {
        return grayscaleMatrix.map((v) => (v / 255) * 0.99 + 0.01);
    };

    const { width, height, data } = path.ctx.getImageData(
        0,
        0,
        path.canvas.width,
        path.canvas.height,
    );
    const matrixRGB: object[] = pathToMatrix(width, height, data);
    const grayScale = grayscaleMatrix(matrixRGB);
    return normalize(grayScale);
};
