
export class Section {
    surveyId;
    sectionId;
    sectionTitle;
    sectionDescription;
    noOfQuestions;
    questions;
    connectedFlows;

    constructor(surveyId, sectionId, sectionTitle, sectionDescription, noOfQuestions, questions, connectedFlows) {
        this.surveyId = surveyId;
        this.sectionId = sectionId;
        this.sectionTitle = sectionTitle;
        this.sectionDescription = sectionDescription;
        this.noOfQuestions = noOfQuestions;
        this.questions = questions;
        this.connectedFlows = connectedFlows;
    }
}