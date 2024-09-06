import { Router } from "express";
import { index, indexFile, login, login1, signup } from "../controller/urls.js";
import { changeSingleField, ChangingData, userLogin, varifyingToken } from "../models/users.js";
import { fileURLToPath } from 'url';
import path from 'path'

const rout = Router()

rout.get('/', indexFile);
rout.post("/signup", signup)
rout.post("/login", userLogin, varifyingToken, login)
rout.put("/updatingInfo/:email", varifyingToken, ChangingData)
rout.patch("/updatingSinglInfo", varifyingToken, changeSingleField)


export default rout


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRhZmVhZDhmNTk5NTEyM2EyZTBkMGIiLCJpYXQiOjE3MjU2MzI5NTIsImV4cCI6MTcyNTYzNjU1Mn0.hYeoaU59lgILAqo9vXi23ADl0vfVXKkDiqOrKGUZvGo
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRhZmVhZDhmNTk5NTEyM2EyZTBkMGIiLCJpYXQiOjE3MjU2MzMwMDgsImV4cCI6MTcyNTYzNjYwOH0.30-E5gM6c51xumpfN1qPJEtDUuowHNr8U7aVa2QJ0s8