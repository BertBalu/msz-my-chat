export class EventProducer<M> {
    private listeners: { type: keyof M, listener, obj?: Object }[] = [];

    addEventListener<K extends keyof M>(type: K, listener: M[K], obj?: Object) {
        this.listeners.push({ type, listener, obj });
    }

    removeEventListener<K extends keyof M>(type: K, listener: M[K]) {
        this.listeners.splice(this.listeners.findIndex(l => l.type === type && l.listener === listener), 1);
    }

    protected dispatch<K extends keyof M>(type: K, ...args) {
        for (let listener of this.listeners.filter(l => l.type === type)) {
            listener.listener.call(listener.obj, ...args);
        }
    }

    removeAllEventListener(obj: Object) {
        if (!obj)
            throw new Error("Must specify object");
        this.listeners = this.listeners.filter(l => l.obj !== obj);
    }
}