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
    isRequired;
    noOfResponses;

    constructor(sectionId, surveyId, questionId, questionString, questionType, isRequired, noOfResponses, options = []) {
        this.sectionId = sectionId;
        this.surveyId = surveyId;
        this.questionId = questionId;
        this.questionString = questionString;
        this.questionType = questionType;
        //options: { option: string, percentage: number } []
        this.options = options;
        this.isRequired = isRequired;
        this.noOfResponses = noOfResponses;
    }

    constructor(json, surveyId, sectionId) {
        this.surveyId = surveyId;
        this.sectionId = sectionId;
        this.questionId = json.questionId;
        this.questionString = json.questionString;
        this.questionType = json.questionType;
        this.options = json.options;
        this.isRequired = json.isRequired;
        this.noOfResponses = json.noOfResponses;
    }

    toJson() {
        return {
            sectionId: this.sectionId,
            surveyId: this.surveyId,
            questionId: this.questionId,
            questionString: this.questionString,
            questionType: this.questionType,
            options: this.options
        };
    }
}