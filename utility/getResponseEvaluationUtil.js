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
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

export class GetResponseEvaluationUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try{
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const configPath = path.join(__dirname, '..', 'config.json');
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                let apiUrl = config.Relevance_API;
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