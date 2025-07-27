export const throttle =<T extends (...args: any[]) => any> (
    fn: T, delay: number
): (...args: Parameters<T>) => ReturnType<T> => {
    let pause = false;
    return (...args: Parameters<T>): ReturnType<T> => {
        if(!pause) {
            const result = fn(...args);
            pause = true;
            setTimeout(() => pause = false, delay);
            return result;
        }
    }
}