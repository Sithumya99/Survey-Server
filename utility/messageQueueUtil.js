/**
* @fileoverview Utility for maintaining message object queue.
* 
* @description This class provides functions for adding and retrieving message objects to/from queue.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

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