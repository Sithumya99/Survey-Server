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
    surveyId;
    flowId;
    conditions;
    sectionFlow;
    
    constructor(json, surveyId) {
        this.surveyId = surveyId;
        this.sectionId = json.sectionId;
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