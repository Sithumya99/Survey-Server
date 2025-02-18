/**
* @fileoverview Handles adding message objects to queue.
* 
* @description This class provides the function for creating a message object for a request and adding it to the queue.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { Message } from "./models/message.js";
import { LoginUserUtil } from "./utility/loginUserUtil.js";
import { RegisterUserUtil } from "./utility/registerUserUtil.js";
import { CreateSurveyUtil } from "./utility/createSurveyUtil.js";
import { GetClarificationUtil } from "./utility/getClarificationUtil.js";
import { GetResponseEvaluationUtil } from "./utility/getResponseEvaluationUtil.js";
import { GetSurveyUtil } from "./utility/getSurveyUtil.js";
import { SubmitResponseUtil } from "./utility/submitResponseUtil.js";
import { GetSurveyDetailsUtil } from "./utility/getSurveyDetailsUtil.js";

export class MessageHandler {
    static handleRequest(command, data) {
        return new Promise(async (resolve, reject) => {
            console.log("create message");
            const message = new Message(command, data, resolve, reject);
            try {
                let result = await this.executeCommand(message);
                console.log("message executed result: ", result);
                resolve(result);
            } catch(err) {
                reject(err);
            }
        });
    }

    static async executeCommand(message) {
        try {
            switch(message.command) {
                case "login":
                    let loginUtil = new LoginUserUtil(message);
                    return await loginUtil.execute();
                case "register":
                    console.log("execute register");
                    let registerUtil = new RegisterUserUtil(message);
                    return await registerUtil.execute();
                case "createsurvey":
                    let createSurveyUtil = new CreateSurveyUtil(message);
                    return await createSurveyUtil.execute();
                case "getclarification":
                    let getClarificationUtil = new GetClarificationUtil(message);
                    return await getClarificationUtil.execute();
                case "getresponseevaluation":
                    let getResponseEvaluationUtil = new GetResponseEvaluationUtil(message);
                    return await getResponseEvaluationUtil.execute();
                case "getsurvey":
                    let getSurveyUtil = new GetSurveyUtil(message);
                    return await getSurveyUtil.execute();
                case "submitresponse":
                    let submitResponseUtil = new SubmitResponseUtil(message);
                    return await submitResponseUtil.execute();
                case "getsurveydetails":
                    let getSurveyDetailsUtil = new GetSurveyDetailsUtil(message);
                    return await getSurveyDetailsUtil.execute();
            }
            throw new Error("Invalid command");
        } catch(error) {
            throw error;
        }
    }
}