export const compressArr = (arr: number[]): number[] => {
    const resized: number[] = arr.reduce((acc: number[], cur: number, idx: number) => {
        if (idx % 8 === 0) acc.push(cur);
        else acc[acc.length - 1] += cur;
        return acc;
    }, []);
    const logScale: number[] = resized.map((v: number): number => Math.log(v + 1) / Math.log(9));
    return logScale;
};
