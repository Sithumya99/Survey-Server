/**
* @fileoverview Model for survey responses.
* 
* @description This class provides the structure and functions of survey questions.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

export class Response {
    surveyId;
    answers;

    constructor(surveyId, answers) {
        this.surveyId = surveyId;
        this.answers = answers;
    }

    toJson() {
        return {
            surveyId: this.surveyId,
            answers: this.answers
        };
    }
}