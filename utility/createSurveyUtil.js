/**
* @fileoverview Utility class for handling survey creation.
* 
* @description This class executes the request for creating a new survey.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

import { GlobalDatabase } from "../database/globalDatabase.js";
import { Survey } from "../models/survey.js";

export class CreateSurveyUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                let newSurvey = new Survey(this.message.data);

                await GlobalDatabase.createSurvey(newSurvey);

                resolve({ success: true });
            } catch(error) {
                reject(error);
            }
        });
    }
}