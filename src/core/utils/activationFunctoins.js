const activationFunction = (list) => {
    return list.map(v => {
        const value = sigmoid(v)
        return parseFloat(value.toFixed(5)) //활성화 함수를 적용시킨 값을 소숫점 5자리로 반올림
    })
}

const sigmoid = ($x) => {
    return 1 / (1 + Math.exp(-$x));
};

const ReLU = ($x) => {
    return Math.max(0, $x);
}

export default activationFunction;