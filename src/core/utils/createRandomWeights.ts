export const createRandomWeight = (col: number, row: number): number[][] =>
    Array.from({ length: col }, (): number[] =>
        Array.from({ length: row }, (): number => {
            const value: number = (Math.random() - 0.5) * 1.99999;
            return value;
        }),
    );
