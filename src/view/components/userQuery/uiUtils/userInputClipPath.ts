export const userInputClipPath = ({ radius = 560, canvasWidth, canvasHeight }) => {
    const w = canvasWidth;
    const h = canvasHeight;

    // 반지름과 호각 설정
    const cx = w / 2;
    const cy = radius;
    const startAngle = Math.PI; // 180도
    const endAngle = 2 * Math.PI; // 360도

    // 반원 양 끝 좌표
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    // SVG arc path (절대좌표 기준)
    const path = `
    M ${x1} ${y1}
    A ${radius} ${radius} 0 0 1 ${x2} ${y2}
    L ${w} ${h}
    L 0 ${h}
    Z
  `;

    return path;
};
