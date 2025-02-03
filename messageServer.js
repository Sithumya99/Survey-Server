import { MessageQueueUtil } from "./utility/messageQueueUtil.js";

export class MessageServer {
    static async processMessage() {
        while(true) {
            if (!MessageQueueUtil.isEmpty()) {
                const message = MessageQueueUtil.get();
                try {
                    let result = await this.executeMessage(message);
                    message.resolve(result);
                } catch(error) {
                    message.reject(error);
                }
            }
            await new Promise(res => setTimeout(res, 100));
        }
    }

    static async executeMessage(message) {
        //exceute bpdy
    }
}

MessageServer.processMessage();