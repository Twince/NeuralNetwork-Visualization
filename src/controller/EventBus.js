const EventBus = {
    _events: {},

    on(eventName, subscriber) {
        if(!this._events[eventName]) this._events[eventName] = [];
        this._events[eventName].push(subscriber);
        console.log("📌 [eventBus] 등록됨:", eventName);
    },

    off(eventName, subscriber) {
        if(!this._events[eventName]) return;
        this._events[eventName] = this._events[eventName].filter(fn => fn !== subscriber);
    },

    emit(eventName, payload) {
        if(!this._events[eventName]) return;
        console.log("📡 [eventBus] emit 발생:", eventName, payload);
        this._events[eventName].forEach(fn => fn(payload));
    }
}

export default EventBus;