import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TipSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  content: {
    type: String,
    required: [true, "Please add a content"],
  },
});

const TipModel = mongoose.model("TipModel", TipSchema); 
export default TipModel;


