import { GlobalDatabase } from "../database/globalDatabase";

export class GetSurveyDetailsUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                let surveySnapshot = await GlobalDatabase.getSurveyById(this.message.data.surveyId);
                if (surveySnapshot.empty){
                    throw new Error("Survey not found");
                }

                let surveyDoc = surveySnapshot.docs[0];

                resolve({ success: true, surveyId: surveyDoc.surveyId, surveyTitle: surveyDoc.surveyTitle, surveyDescription: surveyDoc.surveyDescription, isLoginRequired: surveyDoc.isLoginRequired });
            } catch(error) {
                reject(error);
            }
        });
    }
}