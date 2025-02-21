/**
* @fileoverview Model for survey questions.
* 
* @description This class provides the structure and functions for survey questions.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

export class Question {
    sectionId;
    surveyId;
    questionId;
    questionString;
    questionType;
    options;
    noOfResponses;

    constructor(json, surveyId, sectionId) {
        this.surveyId = surveyId;
        this.sectionId = sectionId;
        this.questionId = json.questionId;
        this.questionString = json.questionString;
        this.questionType = json.questionType;
        this.options = json.options;
        this.noOfResponses = json.noOfResponses;
    }

    toJson() {
        return {
            sectionId: this.sectionId,
            surveyId: this.surveyId,
            questionId: this.questionId,
            questionString: this.questionString,
            questionType: this.questionType,
            options: this.options,
            noOfResponses: this.noOfResponses
        };
    }
}