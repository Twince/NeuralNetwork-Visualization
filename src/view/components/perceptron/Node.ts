import { value } from '@/view/components/perceptron/types/Node.ts';

export class Node {
    private value: Number;
    constructor(value: number) {
        this.value = value;
    }
    setValue(value: number): void {
        this.value = value;
    }
    getValue(value: number): number {
        return this.value;
    }
}
