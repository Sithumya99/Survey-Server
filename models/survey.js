/**
* @fileoverview Model for surveys.
* 
* @description This class provides the structure and functions for surveys.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

export class Survey {
    surveyId;
    surveyTitle;
    surveyDescription;
    owner;
    noOfSections;
    noOfResponses;
    sections;
    responses;
    flows;
    requiresLogin;

    constructor(surveyId, surveyTitle, surveyDescription, noOfSections, flows, owner, sections, requiresLogin) {
        this.surveyId = surveyId;
        this.surveyTitle = surveyTitle;
        this.surveyDescription = surveyDescription;
        this.owner = owner;
        this.noOfSections = noOfSections;
        this.noOfResponses = 0;
        this.sections = sections;
        this.responses = [];
        this.flows = flows;
        this.requiresLogin = requiresLogin;
    }

    toJson() {
        return {
            surveyId: this.surveyId,
            surveyTitle: this.surveyTitle,
            surveyDescription: this.surveyDescription,
            owner: this.owner,
            noOfSections: this.noOfSections,
            noOfResponses: this.noOfResponses,
            sections: this.getSectionsJson(),
            responses: this.getResponsesJson(),
            flows: this.getFlowsJson(),
            requiresLogin: this.requiresLogin
        };
    }

    getSectionsJson() {
        let sectionsArray = [];
        for (let i = 0; i < this.sections.legth; i++) {
            sectionsArray.push(this.sections[i].toJson());
        }
        return sectionsArray;
    }

    getResponsesJson() {
        let responsesArray = [];
        for (let i = 0; i < this.responses.length; i++) {
            responsesArray.push(this.responses[i].toJson());
        }
        return responsesArray;
    }

    getFlowsJson() {
        let flowsArray = [];
        for(let i = 0; i < this.flows.legth; i++) {
            flowsArray.push(this.flows[i].toJson());
        }
        return flowsArray;
    }
}