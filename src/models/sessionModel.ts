import mongoose from "mongoose";
import sessionSchema from "schemas/sessionSchema";

const Session = mongoose.model("Session", sessionSchema);

export default Session;