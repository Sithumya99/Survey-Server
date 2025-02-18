/**
* @fileoverview Utility for handling user login.
* 
* @description This class executes the process of authenticating user profile.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

import { GlobalDatabase } from "../database/globalDatabase.js";
import { UserProfile } from "../models/userProfile.js";
import pkg from 'bcrypt';
const { bcrypt } = pkg;

export class LoginUserUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                //user details from request
                let user = new UserProfile(this.message.data);
                //user details from database
                let userSnapshot = await GlobalDatabase.getUserByUsername(user.username);

                if (userSnapshot.empty) {
                    throw new Error("Incorrect username");
                }

                let userDoc = userSnapshot.docs[0];
                let isPasswordCorrect = await bcrypt.compare(user.password, userDoc.password);

                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }
                
                let ownerSurveys = [];
                let surveySnapshot = await GlobalDatabase.getSurveysByOwner(userDoc.id);
                if (!surveySnapshot.empty) {
                    surveySnapshot.docs.forEach(doc => {
                        ownerSurveys.push({
                            id: doc.id,
                            surveyId: doc.surveyId,
                            surveyTitle: doc.surveyTitle
                        });
                    });
                }

                resolve({success: true, username: userDoc.username, surveys: ownerSurveys});

            } catch(error) {
                reject(error);
            }
        })
    }
}