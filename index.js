/**
* @fileoverview Application file
* 
* @description Main file of the application, inititalizes database, starts listening for requests, authenticate necessary requests and calls method to create message object for request.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/
import express from 'express';
import cors from 'cors';
import { MessageHandler } from './messageHandler.js';
import { GlobalDatabase } from './database/globalDatabase.js';
import { AuthenticatorUtil } from "./utility/authenticatorUtil.js";

// Initialize Firebase Database
GlobalDatabase.initializeDatabase();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors("*"))
app.post('/:action', async (req, res) => {
    try {
        const { action } = req.params;
        if (action == "createsurvey" || action == "getsurveydetail") {
            const authHeader = req.headers["authorization"];
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new Error("No Authentication Token: Access denied");
            }
            console.log("Auth header: ", authHeader.split(" "));
            AuthenticatorUtil.verifyToken(authHeader.split(" ")[1]);
        }
        const result = await MessageHandler.handleRequest(action, req.body);
        console.log("final result: ", result);
        
        if (req.body.username) {
            const token = AuthenticatorUtil.generateToken(req.body.username);
            console.log("token: ", token);

            result.token = token;
        }

        res.status(200).json(result);
    } catch (error) {
        console.log("error: ", error)
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
