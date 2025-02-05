/**
* @fileoverview Model for survey flows.
* 
* @description This class contains the flow details and methods related to processing flows.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

export class Flow {
    sectionId;
    surveyId;
    flowId;
    conditions;
    sectionFlow;

    constructor(sectionId, surveyId, flowId, conditions, sectionFlow) {
        this.sectionId = sectionId;
        this.surveyId = surveyId;
        this.flowId = flowId;
        this.conditions = conditions;
        this.sectionFlow = sectionFlow;
    }

    constructor(json, surveyId) {
        this.surveyId = surveyId;
        this.sectionId = json.surveyId;
        this.flowId = json.flowId;
        this.conditions = json.conditions;
        this.sectionFlow = json.sectionFlow;
    }

    toJson() {
        return {
            sectionId: this.sectionId,
            surveyId: this.surveyId,
            flowId: this.flowId,
            conditions: this.conditions,
            sectionFlow: this.sectionFlow
        };
    }
}