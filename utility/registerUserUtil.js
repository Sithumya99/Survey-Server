/**
* @fileoverview Utility for creating a new user.
* 
* @description This class executes the process of registering a new user by creating a new user document.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import { GlobalDatabase } from "../database/globalDatabase";
import { UserProfile } from "../models/userProfile";

export class RegisterUserUtil {
    message;

    constructor(message) {
        this.message = message;
    }

    async execute() {
        return new Promise(async (resolve, reject) => {
            try {
                let newUser = new UserProfile(this.message.data);
                await GlobalDatabase.createUser(newUser);
                resolve({ success: true, username: newUser.username });
            } catch(error) {
                reject(error);
            }
        });
    }
}