import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    u_name : String,
    email_id : String,
    phn_no : String,
    city : String,
    passkey : String,
})

export default mongoose.models.Ruser || mongoose.model("Ruser", UserSchema);
