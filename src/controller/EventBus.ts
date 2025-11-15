import { IEventBus } from './types/eventBus';
import { eventPayloads } from './types/eventBus';

const EventBus: IEventBus = {
    events: {},

    on<K extends keyof eventPayloads>(
        eventName: K,
        subscriber: (payload: eventPayloads[K]) => any,
    ): void {
        if (!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(subscriber);
    },

    off<K extends keyof eventPayloads>(
        eventName: K,
        subscriber: (payload: eventPayloads[K]) => any,
    ): void {
        if (!this.events[eventName]) return;
        this.events[eventName] = this.events[eventName].filter(
            (fn: (payload: eventPayloads[K]) => void): boolean => fn !== subscriber,
        );
    },

    emit<K extends keyof eventPayloads>(eventName: K, payload: eventPayloads[K]): void {
        if (!this.events[eventName]) return;
        this.events[eventName].forEach((fn: (payload: eventPayloads[K]) => any): any =>
            fn(payload),
        );
    },
};

export default EventBus;
