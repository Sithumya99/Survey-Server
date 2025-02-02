
export class Message {
    command;
    data;
    resolve;
    reject;

    constructor(command, data, resolve, reject) {
        this.command = command;
        this.data = data;
        this.resolve = resolve;
        this.reject = reject;
    }
}