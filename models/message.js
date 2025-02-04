/**
* @fileoverview Model for message.
* 
* @description This class provides the structure and functions of messages used for storing request details.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

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