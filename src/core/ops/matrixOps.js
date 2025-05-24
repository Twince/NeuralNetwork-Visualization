export const matrixMultiply = (A, B) => {
    A = Array.isArray(A[0]) ? A : [A];
    if (!Array.isArray(A) || !Array.isArray(B)) throw new Error('matrixA, B must be an array');
    else if (A[0].length !== B.length) throw new Error('rows and columns length doesn\'t match');
    return A.map((row, i) =>
        B[0].map((_, j) =>
            row.reduce((sum, _, k) => {
                return sum + A[i][k]*B[k][j];
            }, 0)
        )
    )
}

export const transposeMatrix = matrix =>
    matrix[0].map((_, idx)=> matrix.map(row => row[idx]))