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
                let apiUrl = process.env.RESPONSE_RELEVANCE_AGENT_URL;
                let requestData = {};
                let result = await axios.post(apiUrl, requestData);

                if(!result) {
                    throw new Error("Service unavailable, please try again later.");
                }

                resolve(result);
            } catch(error) {
                reject(error);
            }
        });
    }
}