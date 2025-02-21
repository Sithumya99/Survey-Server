/**
* @fileoverview Utility for handling getting survey details.
* 
* @description This class executes the process of retrieving a survey from the database.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { GlobalDatabase } from "../database/globalDatabase.js";

export class GetSurveyUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("surveyId: ", this.message.data.surveyId);
                let surveySnapshot = await GlobalDatabase.getSurveyBySurveyId(this.message.data.surveyId);
                if (surveySnapshot.empty) {
                    throw new Error("Survey not found");
                }

                let surveyDoc = surveySnapshot.docs[0].data();
                
                resolve({survey: surveyDoc});
            } catch(error) {
                reject(error);
            }
        });
    }
}