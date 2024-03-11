import mongoose from "mongoose";
import { dbName } from "../constant.js";

const connectToDatabase = async (req, res) => {
    try {
        const dbconnection = await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`)
        console.log(`mongo db connection established successfully`, dbconnection.connection.host);
    } catch (error) {
        console.log('connection to Database failed', error);
        process.exit(1)
    }
}

export default connectToDatabase;
