import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  data: [String],
  // roomid: {
  //        type: mongoose.Schema.Types.ObjectId,
  //        ref: "Room", // Reference to the User model
  //    }
});

export default mongoose.models.Image|| mongoose.model("Image", imageSchema);
