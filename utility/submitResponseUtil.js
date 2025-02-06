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
                let surveyData = surveyDoc.data(); // Extract actual data

                let newResponse = new Response(this.message.data.surveyId, this.message.data.answers);
                let responseId = await GlobalDatabase.createResponse(newResponse);

                let responsesArray = surveyData.responses || [];
                let noOfResponses = surveyData.noOfResponses || 0;
                responsesArray.push(responseId);
                noOfResponses++;

                // Updating questions, options percentage, and total number of responses
                let sections = surveyData.sections || [];
                for (let i = 0; i < newResponse.answers.length; i++) {
                    let answer = newResponse.answers[i];
                    let answerSection = sections[answer.sectionNo];
                    let question = answerSection.questions[answer.questionNo];

                    question.noOfResponses = (question.noOfResponses || 0) + 1;
                    if (question.questionType !== "open-ended") {
                        let sum = 0;
                        let answerNo = +answer.answerString;
                        for (let j = 0; j < question.options.length; j++) {
                            let option = question.options[j];
                            let numAnswers = ((question.noOfResponses - 1) * (option.percentage || 0)) / 100;
                            if (j === answerNo) {
                                numAnswers++;
                            }

                            let newPercent = (numAnswers / question.noOfResponses) * 100;
                            option.percentage = parseFloat(newPercent.toFixed(2)); // Fix floating point precision
                            sum += newPercent;
                        }

                        let diff = 100 - sum;
                        if (!isNaN(diff) && isFinite(diff)) {
                            question.options[0].percentage = parseFloat((question.options[0].percentage + diff).toFixed(2));
                        }
                    }
                }

                // Update document
                let surveyDocRef = surveyDoc.ref;
                await surveyDocRef.update({
                    responses: responsesArray,
                    noOfResponses: noOfResponses,
                    sections: sections
                });

                resolve({ success: true });
                
            } catch(error) {
                reject(error);
            }
        });
    }
}