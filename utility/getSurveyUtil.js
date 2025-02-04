/**
* @fileoverview Utility for handling getting survey details.
* 
* @description This class executes the process of retrieving a survey from the database.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { GlobalDatabase } from "../database/globalDatabase";

export class GetSurveyUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                let surveySnapshot = await GlobalDatabase.getSurveyById(this.message.data.surveyId);
                if (surveySnapshot.empty) {
                    throw new Error("Survey not found");
                }

                let surveyDoc = surveySnapshot.docs[0];
                resolve(surveyDoc);
            } catch(error) {
                reject(error);
            }
        });
    }
}