import { GlobalDatabase } from "../database/globalDatabase.js";

export class GetSurveyDetailsUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                let surveySnapshot = await GlobalDatabase.getSurveyById(this.message.data.surveyId.trim());
                if (!surveySnapshot.exists){
                    throw new Error("Survey not found");
                }

                let surveyDoc = surveySnapshot.data();

                resolve({ success: true, survey: surveyDoc });
            } catch(error) {
                reject(error);
            }
        });
    }
}