import express from 'express'
// import mongo from './db/connetions.js'
import rout from './routers/router.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { userSchema } from './models/users.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth", rout)

app.use(express.static("./static"))

app.use((req, res, next) => {
    const requestPath = req.url;
    // Block access to specific files like 'profile.html'
    if (requestPath === '/profile.html' || requestPath.startsWith('/static/')) {
        res.status(403).send('Access denied');
    } else {
        next();
    }
});




app.listen(3000, () => {
    console.log("server is running")
})

