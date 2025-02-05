/**
* @fileoverview Utility for handling saving responses to a survey.
* 
* @description This class executes the process for saving a response to a survey.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

import { GlobalDatabase } from "../database/globalDatabase.js";
import { Response } from "../models/response.js";

export class SubmitResponseUtil {
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
                let responsesArray = surveyDoc.responses;
                let newResponse = new Response(this.message.data.surveyId, this.message.data.answers);
                let responseId = await GlobalDatabase.createResponse(newResponse);
                responsesArray.push(responseId);
                //add percentage calculations for answers and response count incrementing
                let surveyDocRef = surveyDoc.ref;
                await surveyDocRef.update({ responses: responsesArray });

                resolve({ success: true });
                
            } catch(error) {
                reject(error);
            }
        });
    }
}