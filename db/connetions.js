import mongo from "mongoose";

try {
    await mongo.connect("mongodb+srv://devenderdhyani:Witz%402024@cluster0.gfpsm.mongodb.net/prisma?retryWrites=true&w=majority")
    console.log("connected ... using Connection file...")
} catch (e) {
    console.log("connections File Error while connecting Database: ", e)
}


export {
    mongo
}