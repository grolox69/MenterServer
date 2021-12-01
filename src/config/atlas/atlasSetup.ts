import mongoose from "mongoose";

export default function connectDb() {
    const dbURI = process.env.MONGODB_URI || "";

    return mongoose.connect(dbURI);
}