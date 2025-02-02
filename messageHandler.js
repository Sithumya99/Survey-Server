import { Message } from "./models/message";
import { MessageQueueUtil } from "./utility/messageQueueUtil";

export class MessageHandler {
    static handleRequest(command, data) {
        return new Promise((resolve, reject) => {
            const message = new Message(command, data, resolve, reject);
            MessageQueueUtil.put(message);
        });
    }
}