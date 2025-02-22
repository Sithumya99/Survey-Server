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
                console.log("data: ", this.message.data);
                let surveySnapshot = await GlobalDatabase.getSurveyBySurveyId(this.message.data.response.surveyId);
                if (surveySnapshot.empty) {
                    throw new Error("Survey not found");
                }

                let surveyDoc = surveySnapshot.docs[0];
                let surveyData = surveyDoc.data(); // Extract actual data

                let newResponse = new Response(this.message.data.response.surveyId, this.message.data.response.answers);
                let responseId = await GlobalDatabase.createResponse(newResponse);

                let responsesArray = surveyData.responses || [];
                let noOfResponses = surveyData.noOfResponses || 0;
                responsesArray.push(newResponse.toJson());
                noOfResponses++;

                // Updating questions, options percentage, and total number of responses
                let sections = surveyData.sections || [];
                for (let i = 0; i < newResponse.answers.length; i++) {
                    let answer = newResponse.answers[i];
                    let answerSection = sections.find(sec => sec.sectionId == answer.sectionId);
                    let question = answerSection.questions.find(q => q.questionId == answer.questionId);

                    question.noOfResponses = (question.noOfResponses || 0) + 1;
                    if (question.questionType !== 'open') {
                        let sum = 0;
                        let answerNo = answer.answer.split("/");
                        for (let j = 0; j < question.options.length; j++) {
                            let option = question.options[j];
                            let numAnswers = ((question.noOfResponses - 1) * (option.percentage || 0)) / 100;
                            for (let a = 0; a < answerNo.length; a++) {
                                let answer = answerNo[a];
                                if (j == answer) {
                                    numAnswers++;
                                    console.log("option: ", option.option, " | numanswers: ", numAnswers);
                                }
                            }

                            let newPercent = (numAnswers / question.noOfResponses) * 100;
                            console.log("option: ", option.option, " | percent: ", newPercent);
                            option.percentage = parseFloat(newPercent.toFixed(2)); // Fix floating point precision
                            sum += newPercent;
                        }

                        let diff = 100 - sum;
                        if (!isNaN(diff) && isFinite(diff) && question.questionType !== 'checkbox') {
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