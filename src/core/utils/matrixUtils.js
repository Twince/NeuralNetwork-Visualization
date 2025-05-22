export const createRandomWeight = (col, row) =>
    Array.from({ length: col }, () =>
        Array.from({ length: row }, () =>  {
            const value = (Math.random() - .5) * 1.99999;
            // return parseFloat(value.toFixed(5));
            return value;
        })
    );

export const matrixMultiply = (A, B) => {
    A = Array.isArray(A[0]) ? A : [A];
    // console.log("A:",A, "B:", B);
    // console.log("A[0].length:",A[0].length, "B.length:", B.length);
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