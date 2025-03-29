export const createRandomWeight = (pre, post) =>
    Array.from({ length: pre }, () =>
        Array.from({ length: post }, () =>  {
            const value = (Math.random() - .5) * 1.99999;
            return parseFloat(value.toFixed(5));
        })
    );

export const matrixMultiplication = (matrix1, matrix2) => {

}