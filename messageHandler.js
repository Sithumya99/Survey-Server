/**
* @fileoverview Handles adding message objects to queue.
* 
* @description This class provides the function for creating a message object for a request and adding it to the queue.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
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