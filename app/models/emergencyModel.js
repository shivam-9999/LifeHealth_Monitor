import mongoose from 'mongoose';
const Schema = mongoose.Schema;

 const EmergencySchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "PatientModel",
  },
  concern: {
    type: String,
    required: [true, "Please add a concern"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const EmergencyModel = mongoose.model("EmergencyModel", EmergencySchema); 
export default EmergencyModel;

