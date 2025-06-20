import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    filename: { 
        type: String, 
        required: true
    },
    path: { 
        type: String,
        required: true
    },
    cloudinaryId: { 
        type: String 
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
});

const attachmentModel = mongoose.model("Attachment", attachmentSchema);
export default attachmentModel;

