import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MotivationalVideoSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true,
    },
    description: {
        type: String,
        required: "Description is required",
        trim: true,
    },
    videoUrl: {
        type: String,
        required: "Video URL is required",
    },
});

const MotivationalVideoModel = mongoose.model("MotivationalVideoModel", MotivationalVideoSchema); 
export default MotivationalVideoModel;