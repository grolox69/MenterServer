import mongoose from "mongoose";
import sessionSchema from "schemas/sessionSchema";

const SessionType = mongoose.model("Session", sessionSchema);

export default SessionType;