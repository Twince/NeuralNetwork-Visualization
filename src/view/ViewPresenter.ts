import eventBus from '@/controller/EventBus.ts';
import { DATA_EVENTS, DRAWING_EVENTS } from '@/controller/constants/events.ts';

import { Matrix2D } from '@/core/ops/types/OpsType.ts';

class ViewPresenter {
    private readonly El: HTMLElement | null;

    constructor() {
        this.El = document.getElementById('result') as HTMLDivElement;
        this.normalizeResult();
        this.renderResult(undefined);
    }

    normalizeResult() {
        eventBus.on(DATA_EVENTS.RESULT_CHANGED, (data: Matrix2D) => {
            const queryResults = data.flatMap((v: number[], index) => v[0] * 100);
            const result = queryResults.reduce(
                (acc: number, cur: number, index: number, arr: number[]) => {
                    return arr[acc] < cur ? index : acc;
                },
                0,
            );
            // const result: number = Math.max(...queryResults);
            this.renderResult(result);
        });
        eventBus.on(DRAWING_EVENTS.CLEAR_DRAW, () => {
            this.renderResult(undefined);
        });
    }

    renderResult(result: number | undefined): void {
        const networkAnswer =
            (this.El.innerHTML = `<div>${result == undefined ? '?' : result}</div>`);
    }
}

export default ViewPresenter;
