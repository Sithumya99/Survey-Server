
export class Response {
    surveyId;
    answers;

    constructor(surveyId, answers) {
        this.surveyId = surveyId;
        this.answers = answers;
    }
}