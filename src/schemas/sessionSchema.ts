import mongoose, { Schema } from "mongoose";

const sessionSchema: Schema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
    isCanceled: {
		type: Boolean,
		required: false,
		default: false
	},
	guest: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	sessionType: {
		type: Schema.Types.ObjectId,
		ref: 'SessionType'
	}
});

export default sessionSchema;