/**
* @fileoverview Authentication utilities for handling JWT tokens.
* 
* @description This module provides functions for generating and verifying JWT tokens.
* 
* @author Sithumya Jayawardhana
* @version 1.0.0
* @date 2025-02-04
*/

import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
// const dotenv = require('dotenv');

dotenv.config();

export class AuthenticatorUtil {
    static secret_key = "Osmanthus_wine_is_the_same_as_I_remember_but_where_are_those_who_share_the_memories";

    static generateToken(payload) {
        return jwt.sign(payload, this.secret_key, {});
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