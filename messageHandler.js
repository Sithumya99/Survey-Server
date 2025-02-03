import { Message } from "./models/message.js";
import { MessageQueueUtil } from "./utility/messageQueueUtil.js";

export class MessageHandler {
    static handleRequest(command, data) {
        return new Promise((resolve, reject) => {
            const message = new Message(command, data, resolve, reject);
            MessageQueueUtil.put(message);
        });
    }
}