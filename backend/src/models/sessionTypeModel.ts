import mongoose from "mongoose";
import sessionTypeSchema from "schemas/sessionTypeSchema";

const SessionType = mongoose.model("SessionType", sessionTypeSchema);

export default SessionType;