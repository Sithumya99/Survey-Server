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
import bcrypt from 'bcrypt';

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
                    throw new Error("Invalid username");
                }

                let userDoc = userSnapshot.docs[0].data();
                console.log("user password: ", user.password, " | dbPass: ", userDoc.password);
                let isPasswordCorrect = await bcrypt.compare(user.password, userDoc.password);

                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }
                
                let ownerSurveys = [];
                let surveySnapshot = await GlobalDatabase.getSurveysByOwner(userSnapshot.docs[0].id);
                if (!surveySnapshot.empty) {
                    surveySnapshot.docs.forEach(doc => {
                        let data = doc.data();
                        ownerSurveys.push({
                            id: data.id,
                            surveyId: data.surveyId,
                            surveyTitle: data.surveyTitle
                        });
                    });
                }

                resolve({success: true, username: userDoc.username, surveys: ownerSurveys, id: userSnapshot.docs[0].id});

            } catch(error) {
                reject(error);
            }
        })
    }
}