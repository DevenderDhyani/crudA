import { mongo } from "../db/connetions.js";
import { Schema } from "mongoose";
// import mongo from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const skey = "Devenderdhyani"
const schema = mongo.Schema
const userSchema = new schema({
    name: String,
    email: String,
    password: String
}, { collection: "User" })

userSchema.pre('save', async function (next) {
    console.log("encrypting before saving");
    if (!this.isModified('password')) {
        console.log("password not modified");
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        console.log("Generated Salt");
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});



const user = mongo.model("user", userSchema)



const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const usere = await user.findOne({ email: email })
        console.log(usere)
        if (usere && await bcrypt.compare(password, usere.password)) {

            try {
                const token = jwt.sign({ userId: usere._id }, skey, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true }); // Set cookie with httpOnly for security

                console.log("token generated");

                next();
            } catch (e) {
                console.error("Token generating error: ", e);
                res.status(500).json({ message: 'Error generating token' });
            }
        }
        else {
            res.json({
                returned: "password did not matched"
            })
        }
    } catch (e) {
        console.log("Error while fetch data: isAuthentic : \n", e)
    }

}

const varifyingToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['token']; // Access the token from cookies
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, skey, (err, authData) => {
        if (err) {
            console.error("Error occurred while verifying token: ", err);
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            console.log("User has been verified");
            req.user = authData; // Attach user data to the request if needed
            next();
        }
    });
}

const ChangingData = async (req, res, next) => {
    const emailFromPath = req.params.email;
    const emailFromQuery = req.query.email;
    // Prefer URL parameter if both are provided
    const email = emailFromPath || emailFromQuery;
    // const email = emailFromQuery;
    // const { email } = req.body
    const usere = await user.findOne({ email })
    // console.log("changing:", usere)
    if (usere) {
        console.log("🚀 ~ ChangingData ~ usere:", usere)
        const updateData = req.body
        console.log("🚀 ~ ChangingData ~ updateData:", updateData)
        
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        
        const updatedUser = await user.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
        console.log("changing:", updatedUser)
    }
    console.log("changed")

    res.send("user available")
}

const changeSingleField = async (req, res) => {
    // const emailFromPath = req.params.email;
    const emailFromQuery = req.query.email;
    // Prefer URL parameter if both are provided
    // const email = emailFromPath || emailFromQuery;
    const email = emailFromQuery;
    const usere = await user.findOne({ email })
    // console.log("changing:", usere)
    if (usere) {
        const { password } = req.body
        const updatedUser = await user.findOneAndUpdate(
            { email },
            { $set: { password } },
            { new: true, runValidators: true }
        );
        console.log("changing:", updatedUser)
    }
    console.log("changed")
    res.send("Patch request succesfully updated the field of an object into the database...")
}

export {
    user,
    userLogin,
    ChangingData,
    changeSingleField,
    varifyingToken,
    userSchema
}
