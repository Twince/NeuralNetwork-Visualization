import { value } from '@/view/components/perceptron/types/Node.ts';

export class Node {
    private value: value;
    constructor(value: value) {
        this.value = value;
    }
    setValue(value: value): void {
        this.value = value;
    }
    getValue(value: value): number {
        this.value = value;
    }
}
