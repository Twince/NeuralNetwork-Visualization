export const pixelExtractor = (path) => {
    const pathToMatrix = (width, height, data) => {
        return Array.from({ length: height }, (_, y) => {
            return Array.from({ length: width }, (_, x) => {
                const i = (y * width + x) * 4;
                const [r, g, b, a] = data.slice(i, i + 4);
                return { r, g, b, a };
            });
        });
    }

    const grayscaleMatrix = (matrixRGB) => {
        return matrixRGB.flatMap(pixelObject =>
            pixelObject.map(v => {
                const RGB_sum = v.r + v.g + v.b;
                return Math.round(RGB_sum/3);
            }));
    }

    const normalize = (grayscaleMatrix) => {
        return grayscaleMatrix.map(v => (v/255)*0.99+0.01);
    }

    const {width, height, data} = path.ctx.getImageData(0, 0, path.canvas.width, path.canvas.height);
    const matrixRGB = pathToMatrix(width, height, data);
    const grayScale = grayscaleMatrix(matrixRGB);
    return normalize(grayScale);
};