export const createRandomWeight = (col, row) =>
    Array.from({ length: col }, () =>
        Array.from({ length: row }, () =>  {
            const value = (Math.random() - .5) * 1.99999;
            // return parseFloat(value.toFixed(5));
            return value;
        })
    );