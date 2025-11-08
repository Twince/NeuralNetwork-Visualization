import { RENDERER_CONFIG } from '@/controller/constants/rendererConfig.ts';
const { displayNodes, displayEdges } = RENDERER_CONFIG;

import DataStore from '@/controller/DataStore.ts';

class ViewportAdapter {
    private readonly root: HTMLElement;

    constructor() {
        this.root = document.documentElement;
        this.setupRendererConfig();
    }

    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight,
        };
    }

    setupRendererConfig() {
        const { width, height } = this.getViewportSize();
        this.root.style.setProperty('--indicator-margin', `-15px`);
        if (width > 450) {
            const appendedDisplayNodes = width / 50 - 9; //50px을 단위로 하나씩 노드 추가
            DataStore.setPerceptronConfig({
                displayNodes:
                    displayNodes + appendedDisplayNodes > 70
                        ? 70
                        : displayNodes + appendedDisplayNodes, // 성능 및 최적화, UI 고려, 렌더링 노드의 수를 70개로 제한.
                displayEdges: displayEdges,
            });

            const indicatorHeight = 550 - (width - 450) * 0.33 + Math.pow(width / 900, 3);
            this.root.style.setProperty(
                '--indicator-height',
                `${indicatorHeight < 280 ? 280 : indicatorHeight}px`,
            ); // 화면 너비에 따라 인디케이터를 내림.(arc 모양에 따라)
            console.log(indicatorHeight < 250 ? 250 : indicatorHeight);
            if (width > 1060) {
                this.root.style.setProperty(
                    '--indicator-margin',
                    `${-15 + Math.round(width - 1060) / 2}px`,
                );
                console.log('TEST:', Math.round(-15 + (width - 1020) / 2));
            }
        } else {
            DataStore.setPerceptronConfig({
                displayNodes: displayNodes,
                displayEdges: displayEdges,
            });
            this.root.style.setProperty('--indicator-height', `550px`);
        }
        this.root.style.setProperty('--left-indicator-angle', `${-width / 40}deg`);
        this.root.style.setProperty('--right-indicator-angle', `${width / 40}deg`);
    }
}

export default ViewportAdapter;
