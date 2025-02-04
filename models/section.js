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
        this.connectedFlows = connectedFlows;
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