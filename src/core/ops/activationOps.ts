import { Matrix2D } from './types/OpsType.ts';

const activationFunction = (matrix: Matrix2D): Matrix2D =>
    matrix.map((array: number[]): number[] =>
        array.map((v: number): number => {
            const value: number = sigmoid(v);
            return parseFloat(value.toFixed(5)); //활성화 함수를 적용시킨 값을 소숫점 5자리로 반올림
        }),
    );

const sigmoid = ($x: number): number => {
    return 1 / (1 + Math.exp(-$x));
};

const ReLU = ($x: number): number => {
    return Math.max(0, $x);
};

export default activationFunction;
