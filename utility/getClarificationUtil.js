/**
* @fileoverview Utility for handling respondent requesting clarification.
* 
* @description This class executes the process of generating the answer for respondent's clarification question.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class GetClarificationUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try{
                let apiUrl = "https://04b5-35-230-78-59.ngrok-free.app/generate";
                console.log("clarify data: ", this.message.data);
                let requestData = {
                    systemQuestion: this.message.data.clarificationDetails.systemQuestion,
                    userQuestion: this.message.data.clarificationDetails.userQuestion
                };
                let result = await axios.post(apiUrl, requestData);
                console.log("clarification result: ", result.data);

                if(!result) {
                    throw new Error("Service unavailable, please try again later.");
                }

                resolve({answer: result.data.answer});
            } catch(error) {
                reject(error);
            }
        });
    }
}