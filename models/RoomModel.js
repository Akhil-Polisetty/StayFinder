import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    ownerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ruser", // Reference to the User model
        required: true
    },
    roomtype: {
        type: String,
        required: true
    },
    allowedtype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        default: ""
    },
    pics: {
        type: [String], // Array of strings for storing image URLs or file paths
        default: []
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    city:{
        type: String,
        required: true
    }

});

export default mongoose.models.Room || mongoose.model("Room", UserSchema);
