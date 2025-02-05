/**
* @fileoverview Model for survey question sections.
* 
* @description This class provides the structure and function for survey question sections.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

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
        //connectedFlows: { flowId: number, condition: string}
        this.connectedFlows = connectedFlows;
    }

    constructor(json, surveyId) {
        this.surveyId = surveyId;
        this.sectionId = json.sectionId;
        this.sectionTitle = json.sectionTitle;
        this.sectionDescription = json.sectionDescription;
        this.noOfQuestions = json.noOfQuestions;
        this.connectedFlows = json.connectedFlows;

        let questionArray = json.questions;
        for (let i = 0; i < questionArray.length; i++) {
            this.questions.push(questionArray[i], surveyId, this.sectionId);
        }
    }

    toJson() {
        return {
            surveyId: this.surveyId,
            sectionId: this.sectionId,
            sectionTitle: this.sectionTitle,
            sectionDescription: this.sectionDescription,
            noOfQuestions: this.noOfQuestions,
            questions: this.getQuestionsJson(),
            connectedFlows: this.connectedFlows
        };
    }

    getQuestionsJson() {
        let questionsArray = [];
        for (let i = 0; i < this.questions.length; i++) {
            questionsArray.push(this.questions[i].toJson());
        }
        return questionsArray;
    }
}