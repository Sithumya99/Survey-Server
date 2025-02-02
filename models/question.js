
export class Question {
    text;
    qType;
    options;

    constructor(text, qType, options = []) {
        this.text = text;
        this.qType = qType;
        this.options = options;
    }
}