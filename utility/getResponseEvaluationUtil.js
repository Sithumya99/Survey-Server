/**
* @fileoverview Utility for handling response relevance evaluation.
* 
* @description This class executes the process for determining the relevance of respondent's responses.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class GetResponseEvaluationUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try{
                let apiUrl = "";
                let requestData = {
                    context: this.message.data.context,
                    question: this.message.data.question,
                    userResponse: this.message.data.userResponse
                };
                let result = await axios.post(apiUrl, requestData);

                if(!result) {
                    throw new Error("Service unavailable, please try again later.");
                }

                resolve({flag: result.flag});
            } catch(error) {
                reject(error);
            }
        });
    }
}