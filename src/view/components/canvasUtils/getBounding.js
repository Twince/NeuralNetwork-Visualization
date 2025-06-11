export const getBoundingBox = (coordinate, x, y) => {
    return {
        minX: Math.min(coordinate.minX, x),
        maxX: Math.max(coordinate.maxX, x),
        minY: Math.min(coordinate.minY, y),
        maxY: Math.max(coordinate.maxY, y),
    }
}