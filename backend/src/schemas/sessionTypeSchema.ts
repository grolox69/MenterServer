import mongoose, { Schema } from "mongoose";
import { NextFunction } from "express";

const validateSlug = function (slug: string) {
	const hostname = 'https://menter.com/';
	const url = hostname + slug;
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
};

const sessionTypeSchema: Schema = new mongoose.Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    title: {
		type: String,
		required: true,
		trim: true, 
		minLength: 1,
		maxLength: 255
	},
	description: {
		type: String,
		required: false,
		default: "",
		minLength: 0,
		maxLength: 255
	},
	slug: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		validate: [validateSlug, "Invalid slug."],
		minLength: 1,
		maxLength: 255
	},
	// Event duration in minutes
	duration: {
		type: Number,
		required: true,
		min: [0, "Event duration cannot be negative"],
	},
	isEnabled: {
		type: Boolean,
		required: false,
		default: true,
	},
	availability: [
		{
			dayNumber: {
				type: Number,
				required: true,
				min: 0,
				max: 6,
			},
			slots: [
				{
					startTime: {
						hour: {
							type: Number,
							required: true,
							min: 0,
							max: 23,
						},
						minute: {
							type: Number,
							required: true,
							min: 0,
							max: 59,
						},
					},
					endTime: {
						hour: {
							type: Number,
							required: true,
							min: 0,
							max: 23,
						},
						minute: {
							type: Number,
							required: true,
							min: 0,
							max: 59,
						},
					}
				}
			]
		},
	],
});

sessionTypeSchema.pre('save', function(this: any, next: any) {
	this.slug = this.slug.trim().replace(/[^0-9a-z\-\s]+/gi, '').replace(/\s+/gi, '-');
	next();
});

export default sessionTypeSchema;