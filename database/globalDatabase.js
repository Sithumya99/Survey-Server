/**
* @fileoverview Global database interactions management.
* 
* @description This class contains the database and methods for interacting with the database.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import admin from 'firebase-admin';
import { readFile } from "fs/promises";
import { bcrypt } from 'bcrypt';

const serviceAccount = JSON.parse(
    await readFile(new URL("../environment/survey-system-bcs-firebase-adminsdk-fbsvc-80f4e52191.json", import.meta.url))
);

export class GlobalDatabase {
    static db = null;

    static async createUser(user) {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { username: user.username, password: hashedPassword };
        await this.db.collection('users').add(newUser);
    }

    static async getUserByUsername(username) {
        return await this.db.collection('users').where('username', '==', username).get();
    }

    static async createSurvey(survey) {
        const newSurvey = survey.toJson();
        await this.db.collection('surveys').add(newSurvey);
    }

    static async getSurveyById(surveyId) {
        return await this.db.collection('surveys').where('surveyId', '==', surveyId).get();
    }

    static async createResponse(surveyId, answers) {
        const responseRef = this.db.collection('responses').doc();
        await responseRef.set({ surveyId, answers });

        await this.db.collection('surveys').doc(surveyId).update({
            response: admin.firestore.FieldValue.arrayUnion(responseRef.id)
        });

        return responseRef.id;
    }

    static initializeDatabase() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
        this.db = admin.firestore();
        console.log("Database initialized.");
    }
}