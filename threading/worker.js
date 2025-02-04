/**
* @fileoverview File for running worker threads.
* 
* @description This file contains the processes of the worker threads.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { parentPort, workerData } from "worker_threads";
import { LoginUserUtil } from "./utility/loginUserUtil.js";
import { RegisterUserUtil } from "./utility/registerUserUtil.js";
import { CreateSurveyUtil } from "./utility/createSurveyUtil.js";
import { GetClarificationUtil } from "./utility/getClarificationUtil.js";
import { GetResponseEvaluationUtil } from "./utility/getResponseEvaluationUtil.js";
import { GetSurveyUtil } from "./utility/getSurveyUtil.js";
import { SubmitResponseUtil } from "./utility/submitResponseUtil.js";

async function processCommand(message) {
    try {
        switch(message.command) {
            case "login":
                let loginUtil = new LoginUserUtil(message);
                return await loginUtil.execute();
            case "register":
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
        }
        throw new Error("Invalid command");
    } catch(error) {
        throw error;
    }
}

const result = await processCommand(workerData);
parentPort.postMessage(result);