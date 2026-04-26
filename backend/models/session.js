import mongoose from "mongoose";
import Joi from "joi";

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    counsellor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionTopic: { type: String, required: true },
    aboutUser: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    type: { type: String, enum: ['one-on-one', 'group'], required: true },
    timeSlot: {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true }
    },
    chat: [{ 
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
    }],
    status: { 
        type: String, 
        enum: ['pending', 'upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    statusHistory: [{
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        reason: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model("session", sessionSchema);

const validate = (data) => {
    const schema = Joi.object({
        user: Joi.string().required().label("User ID"),
        counsellor: Joi.string().required().label("Counsellor ID"),
        sessionTopic: Joi.string().required().label("Session Topic"),
        aboutUser: Joi.string().required().label("About User"),
        duration: Joi.number().required().min(15).max(180).label("Duration"),
        type: Joi.string().valid('one-on-one', 'group').required().label("Session Type"),
        timeSlot: Joi.object({
            startTime: Joi.date().required(),
            endTime: Joi.date().required()
        }).required().label("Time Slot"),
        status: Joi.string().valid('pending', 'upcoming', 'ongoing', 'completed', 'cancelled').label("Status")
    });
    return schema.validate(data);
};

export { Session, validate };
