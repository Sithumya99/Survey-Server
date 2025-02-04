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

    constructor(sectionId, surveyId, questionId, questionString, questionType, options = []) {
        this.sectionId = sectionId;
        this.surveyId = surveyId;
        this.questionId = questionId;
        this.questionString = questionString;
        this.questionType = questionType;
        this.options = options;
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