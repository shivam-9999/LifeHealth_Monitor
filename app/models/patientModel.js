﻿// Load the module dependencies
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
const PatientSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "email number must be unique"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  // city: {
  //   type: String,
  // },
  phoneNumber: {
    type: String,
  },
});

// Set the 'fullname' virtual property
PatientSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
PatientSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'User' model out of the 'UserSchema'
const PatientModel = mongoose.model("PatientModel", PatientSchema); 
export default PatientModel;
