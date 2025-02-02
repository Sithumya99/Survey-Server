
export class MessageQueueUtil {
    static queue = [];

    static put(message) {
        this.queue.push(message);
    }

    static get() {
        return this.queue.shift();
    }

    static isEmpty() {
        return this.queue.length == 0;
    }
}