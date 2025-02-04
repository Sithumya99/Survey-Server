/**
* @fileoverview Model for user profiles.
* 
* @description This class provides the structure and functions for user profiles.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

export class UserProfile {
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    constructor(data) {
        this.username = data.username;
        this.password = data.password;
    }
}