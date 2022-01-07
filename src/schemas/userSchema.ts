import mongoose, { Schema } from "mongoose";
import { URL } from "url";

const validateEmail = function (email: string) {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(email);
};

const validateURL = function (url: string) {
	const urlRegex =
		/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	return url == null || urlRegex.test(url);
};

const validateVanity = function (slug: string) {
	const hostname = 'https://menter.com/';
	const url = hostname + slug;
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};

const userSchema: Schema = new mongoose.Schema({
	// firebase uid
	uid: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		maxLength: 255
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
		validate: [validateEmail, "Please provide a valid email address."],
		minLength: 5,
		maxLength: 255
	},
	avatar: {
		type: String,
		required: false,
		validate: [validateURL, "Invalid avatar URL."],
	},
	// Booking page url
	vanity_name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true, 
		validate: [validateVanity, "Invalid vanity_name."],
		minLength: 1,
		maxLength: 255
	},
	// Booking page title
	title: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		maxLength: 255,
		
	},
	// Booking page description
	description: {
		type: String,
		required: true,
		default: "",
		minLength: 1,
		maxLength: 255
	},
	sessionTypes: [{
		type: Schema.Types.ObjectId,
		ref: 'SessionType' 
	}],
	sessions: [{
		type: Schema.Types.ObjectId,
		ref: 'Session' 
	}]
});

export default userSchema;