/**
* @fileoverview Retrive message objects from queue and execute them.
* 
* @description This class executes the requests in worker threads by retrieving the message objects from the message queue.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { MessageQueueUtil } from "./utility/messageQueueUtil.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        return new Promise((resolve, reject) => {
            const worker = new Worker(path.join(__dirname, "worker.js"), {
                workerData: message
            });

            worker.on("message", (result) => {
                resolve(result);
            });

            worker.on("error", (error) => {
                reject(error);
            });

            worker.on("exit", (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
}

MessageServer.processMessage();