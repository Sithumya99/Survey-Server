
export class Survey {
    owner;
    questions;
    responses;
    requiresLogin;

    constructor(owner, questions, requiresLogin) {
        this.owner = owner;
        this.questions = questions;
        this.responses = [];
        this.requiresLogin = requiresLogin;
    }
}