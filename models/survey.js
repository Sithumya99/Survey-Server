/**
* @fileoverview Model for surveys.
* 
* @description This class provides the structure and functions for surveys.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { Section } from "./section.js";
import { Response } from "./response.js";
import { Flow } from "./flow.js";

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

    constructor(json, surveyId) {
        this.surveyId = surveyId;
        this.surveyTitle = json.surveyTitle;
        this.surveyDescription = json.surveyDescription;
        this.owner = json.owner;
        this.noOfSections = json.noOfSections;
        this.noOfResponses = json.noOfResponses;
        this.requiresLogin = json.requiresLogin;

        let sectionArray = json.sections;
        for (let i = 0; i < sectionArray.legth; i++) {
            this.sections.push(new Section(sectionArray[i], surveyId));
        }

        this.responses = json.responses;

        let flowArray = json.flows;
        for (let i = 0; i < flowArray.legth; i++) {
            this.flows.push(new Flow(flowArray[i], surveyId));
        }
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