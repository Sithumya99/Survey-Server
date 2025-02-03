import admin from 'firebase-admin';
import { readFile } from "fs/promises";
import { bcrypt } from 'bcrypt';

const serviceAccount = JSON.parse(
    await readFile(new URL("../environment/survey-system-bcs-firebase-adminsdk-fbsvc-80f4e52191.json", import.meta.url))
);

export class GlobalDatabase {
    static db = null;

    static async createUser(username, password) {
        let hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username: username, password: hashedPassword };
        await this.db.collection('users').add(newUser);
    }

    static async createSurvey(ownerId, questions, requiresLogin) {
        const surveyRef = this.db.collection('surveys').doc();
        await surveyRef.set({
            owner: ownerId,
            questions,
            responses: [],
            requiresLogin
        });

        return surveyRef.id;
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