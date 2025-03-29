export const createRandomMatrix = (rows, cols, min = 1, max = 999999) =>
    Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>  {
            const value =  Math.floor((Math.random() * (max - min + 1)) + min)/1000000-0.5;
            return parseFloat(value.toFixed(5));
        })
    );