import { Matrix2D } from './types/OpsType';

const ensure2DArray = (matrix: number[] | number[][]): number[][] => {
    return Array.isArray(matrix[0]) ? (matrix as number[][]) : [matrix as unknown as number[]];
};

export const matrixMultiply = (A: Matrix2D, B: Matrix2D): Matrix2D => {
    A = ensure2DArray(A);

    if (!Array.isArray(A) || !Array.isArray(B)) throw new Error('matrixA, B must be an array');
    else if (A[0].length !== B.length) throw new Error("rows and columns length doesn't match");

    return A.map((row: number[], i: number): number[] =>
        B[0].map((_: unknown, j: number): number =>
            row.reduce((sum: number, _: unknown, k: number): number => {
                return sum + A[i][k] * B[k][j];
            }, 0),
        ),
    );
};

export const transposeMatrix = (matrix: Matrix2D): Matrix2D =>
    matrix[0].map((_: unknown, idx: number): number[] =>
        matrix.map((row: number[]): number => row[idx]),
    );
