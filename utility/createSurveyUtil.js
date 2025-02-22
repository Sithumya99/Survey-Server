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
                console.log("survey data: ", this.message.data)
                let newSurvey = new Survey(this.message.data);

                let surveyId = await GlobalDatabase.createSurvey(newSurvey);

                resolve({ success: true, surveyId: newSurvey.surveyId, surveyTitle: newSurvey.surveyTitle, id: surveyId });
            } catch(error) {
                reject(error);
            }
        });
    }
}