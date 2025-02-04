/**
* @fileoverview Utility for handling respondent requesting clarification.
* 
* @description This class executes the process of generating the answer for respondent's clarification question.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { axios } from 'axios';
import { dotenv } from 'dotenv';

dotenv.config();

export class GetClarificationUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try{
                let apiUrl = process.env.CLARIFICATION_AGENT_URL;
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