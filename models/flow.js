
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
}