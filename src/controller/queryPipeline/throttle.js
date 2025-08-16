export const throttle = (fn, delay) => {
    let pause = false;
    return (...args) => {
        if(!pause) {
            const result = fn(...args);
            pause = true;
            setTimeout(() => pause = false, delay);
            return result;
        }
    }
}