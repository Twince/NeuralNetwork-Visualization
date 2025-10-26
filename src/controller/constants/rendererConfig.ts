import { rendererConfig } from '@/controller/constants/types/rendererConfig.ts';

export const RENDERER_CONFIG: rendererConfig = {
    rotationDelta: 2, // 노드간 기본 간격
    degree: Math.PI / 180, // 1도(radian -> degree)
    mouseScroll: 1, // 마우스 스크롤 값
    displayNodes: 25, // 화면에 표시할 노드의 개수
    scrollDivider: 4, // 스크롤 n틱당 노드 한개 표시(ex. 스크롤 4번시 캔버스 회전)
    gridWidth: 1, // 그리드간 간격
    layerHeight: [600, 635, 670], // 노드의 레이어당 높이(distance from center)
};
