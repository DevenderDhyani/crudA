
// import mongoose from "mongoose"

import { user } from "../models/users.js"
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const indexFile = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "..", 'static', 'index.html'));
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return new Error("no data recieved")
    }
    const newuser = new user({
        name,
        email,
        password
    })
    console.log(newuser)
    await newuser.save();
    console.log("data has been inserted")
    const filePath = path.join(__dirname, '..', 'static', 'login.html');
    res.sendFile(filePath)
}
export const login = (req, res) => {
    console.log("you are an authenticated user")
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '..', 'dynamic', 'profile.html');
    res.sendFile(filePath)
}

// export const profile = (req, res) => {

// }

export const index = (req, res) => {
    res.sendFile("/index.html")
}
export const login1 = (req, res) => {
    res.render("/index.html")
}
export const update = (req, res) => {

}

