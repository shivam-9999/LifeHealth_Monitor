import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "PatientModel",
  },
  fever: {
    type: Boolean,
    required: [true, "Please add a fever"],
  },
  cough: {
    type: Boolean,
    required: [true, "Please add a cough"],
  },
  breathing_difficulty: {
    type: Boolean,
    required: [true, "Please add a breathing difficulty"],
  },
  headache: {
    type: Boolean,
    required: [true, "Please add a headache"],
  },
  sore_throat: {
    type: Boolean,
    required: [true, "Please add a sore throat"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SymptomModel = mongoose.model("SymptomModel", SymptomSchema); 
export default SymptomModel;

