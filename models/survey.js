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
    noOfResponses;
    sections;
    responses;
    flows;
    requiresLogin;
    startSection;

    constructor(json) {
        this.surveyId = json.surveyId;
        this.surveyTitle = json.surveyTitle;
        this.surveyDescription = json.surveyDescription;
        this.owner = json.owner;
        this.noOfResponses = json.noOfResponses;
        this.requiresLogin = json.requiresLogin;
        this.startSection = json.startSection;

        this.sections = [];
        let sectionArray = json.sections;
        for (let i = 0; i < sectionArray.length; i++) {
            this.sections.push(new Section(sectionArray[i], this.surveyId));
        }

        this.responses = [];
        let resArray = json.responses;
        for (let i = 0; i < resArray.length; i++) {
            this.responses.push(new Response(resArray.surveyId, resArray.answers));
        }

        this.flows = [];
        let flowArray = json.flows;
        console.log("survey flows: ", flowArray);
        for (let i = 0; i < flowArray.length; i++) {
            this.flows.push(new Flow(flowArray[i], this.surveyId));
            console.log("flow ", i, ": ", this.flows)
        }
        console.log("survey: ", this);
    }

    toJson() {
        return {
            surveyId: this.surveyId,
            surveyTitle: this.surveyTitle,
            surveyDescription: this.surveyDescription,
            owner: this.owner,
            noOfResponses: this.noOfResponses,
            sections: this.getSectionsJson(),
            responses: this.getResponsesJson(),
            flows: this.getFlowsJson(),
            requiresLogin: this.requiresLogin,
            startSection: this.startSection
        };
    }

    getSectionsJson() {
        let sectionsArray = [];
        for (let i = 0; i < this.sections.length; i++) {
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
        for(let i = 0; i < this.flows.length; i++) {
            flowsArray.push(this.flows[i].toJson());
        }
        return flowsArray;
    }
}