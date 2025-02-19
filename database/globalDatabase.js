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
import bcrypt from 'bcrypt';

const serviceAccount = JSON.parse(
    await readFile(new URL("../environment/survey-system-bcs-firebase-adminsdk-fbsvc-80f4e52191.json", import.meta.url))
);

export class GlobalDatabase {
    static db = null;

    static async createUser(user) {
        console.log("new User: ", user);
        let hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("hashed pass: ", hashedPassword);
        const newUser = { username: user.username, password: hashedPassword };
        return await this.db.collection('users').add(newUser).id;
    }

    static async getUserByUsername(username) {
        return await this.db.collection('users').where('username', '==', username).get();
    }

    static async getSurveysByOwner(owner) {
        return await this.db.collection('surveys').where('owner', '==', owner).get();
    }

    static async createSurvey(survey) {
        const newSurvey = survey.toJson();
        return await this.db.collection('surveys').add(newSurvey).id;
    }

    static async getSurveyById(surveyId) {
        return await this.db.collection('surveys').where('id', '==', surveyId).get();
    }

    static async createResponse(response) {
        return await this.db.collection('responses').add(response).id;
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