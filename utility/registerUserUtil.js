/**
* @fileoverview Utility for creating a new user.
* 
* @description This class executes the process of registering a new user by creating a new user document.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { GlobalDatabase } from "../database/globalDatabase.js";
import { UserProfile } from "../models/userProfile.js";

export class RegisterUserUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("start register: ", this.message);
                let existinguser = await GlobalDatabase.getUserByUsername(this.message.data.username);
                if (!existinguser.empty) {
                    throw new Error("Username already exists");
                }
                let newUser = new UserProfile(this.message.data);
                let userId = await GlobalDatabase.createUser(newUser);
                console.log("end register: ");
                resolve({ success: true, username: newUser.username, id: userId });
            } catch(error) {
                reject(error);
            }
        });
    }
}