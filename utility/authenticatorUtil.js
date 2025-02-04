/**
* @fileoverview Authentication utilities for handling JWT tokens.
* 
* @description This module provides functions for generating and verifying JWT tokens.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

import { jwt } from 'jsonwebtoken';
import { dotenv } from 'dotenv';

dotenv.config();

export class AuthenticatorUtil {
    static secret_key = process.env.JWT_SECRET;

    static generateToken(payload, expiresIn = "1h") {
        return jwt.sign(payload, this.secret_key, { expiresIn });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, this.secret_key);
        } catch (error) {
            console.error("invalid or expired token", error.message);
            throw error;
        }
    }
}