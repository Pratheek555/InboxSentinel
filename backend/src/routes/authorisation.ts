import express from "express";
import { access } from "fs";
import { google } from "googleapis"
import axios from "axios"
import { user } from "./db"
import jwt from "jsonwebtoken"
import { secretKey } from "./config"

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    '523137783564-2ppv0qcq9555pqjgdv0ea74kn0nfrbup.apps.googleusercontent.com',
    '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',
    'http://localhost:1301/api/v1/oauth/google',
);

let code = null;

async function tokenGetter(code: any) {
    try {
        const { tokens } = await oauth2Client.getToken(code); // fetches both tokens
        const tokie = {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryTime: tokens.expiry_date
        };
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        console.log("Expiry date: " + tokie.expiryTime)
        return tokie; // return the tokens object
    } catch (error) {
        console.error('Error fetching tokens:', error);
        return null; // return null if there's an error
    }

}

function expiryChecker() {
    //first off all i need to know where i am gonna store the access token
    // fetch the token from there 
    //no need to use tokenGetter for accesstoken nigga
    //---
    // the access token will be stored in the local storage 
    // along with it's expiry date
    //so in this function i should just be decoding the JWT token 
    // check the payload's expiry time with current time

}

router.get("/google", async (req, res) => {


    code = req.query.code as string; // we are getting this from the query parameters after redirection from the consent page

    const tokie = await tokenGetter(code)
    if (tokie) {
        console.log("Tokie refresh Code:  " + tokie.refreshToken)

        const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
                Authorization: `Bearer ${tokie.accessToken}`, // Use the access token
            }
        });

        try {
            const person = await user.create({
                userName: response.data.name,
                email: response.data.email,
                refreshToken: tokie.refreshToken
            })
            console.log("User Successfully added! :)")
            //JWT encoding
            const newUser_id = person._id;

            var token = jwt.sign({
                accessToken: tokie.accessToken,
                expiryDate: tokie.expiryTime,
            }, secretKey)

            //storing the JWT token in the local storage

            res.redirect("http://localhost:5173/dashboard?token=" + token)
            //localstorage is something you can access from the frontend ediot
            // not from the node.js expression

            // localStorage.setItem("accessToken", token);
            // if (localStorage.getItem("accessToken")) {
            //     console.log("localStorage: " + localStorage.getItem("accessToken"))
            // }
            // else {
            //     console.log("Did not store the JWT token boi!")
            //}
        } catch (error) {
            console.log("There was a problem in getting the user onboard :(")
        }

    } else {
        res.status(500).json({
            message: "Failed to fetch the tokens please check what's wrong niggesh!"
        })
    }




})

export default router;