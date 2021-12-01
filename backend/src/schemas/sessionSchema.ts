import mongoose, { Schema } from "mongoose";

const eventSchema: Schema = new mongoose.Schema({
    title: {
		type: String,
		required: true,
		default: "New Event",
	},
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	// Event duration in minutes
	duration: {
		type: Number,
		required: true,
		default: 30,
		min: 0,
	},
    isCanceled: {
		type: Boolean,
		required: true,
	},
});

export default eventSchema;