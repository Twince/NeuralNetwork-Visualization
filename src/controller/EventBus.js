const EventBus = {
    _events: {},

    on(eventName, subscriber) {
        if(!this._events[eventName]) return this._events[eventName] = [];
        this._events[eventName].push(subscriber);
    },

    off(eventName, subscriber) {
        if(!this._events[eventName]) return;
        this._events[eventName] = this._events[eventName].filter(fn => fn !== subscriber);
    },

    emit(eventName, payload) {
        if(!this._events[eventName]) return;
        this._events[eventName].forEach(fn => fn(payload));
    }
}

export default EventBus;