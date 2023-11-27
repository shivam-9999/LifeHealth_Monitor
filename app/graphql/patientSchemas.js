import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import PatientModel from "../models/patientModel.js";
// import config from "../config/config.js";
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtExpirySeconds = 300;
const jwtKey = process.env.REALSECRET;


export const patientType = new GraphQLObjectType({
  name: "patient",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      // studentNo: {
      //   type: GraphQLString,
      // },
      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      // city: {
      //   type: GraphQLString,
      // },
      phoneNumber: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },

      token: {
        type: GraphQLString,
      },
    };
  },
});

export const patientQuery = {
  patients: {
    type: new GraphQLList(patientType),
    resolve: function () {
      const patients = PatientModel.find().exec();
      if (!patients) {
        throw new Error("patients not found");
      }
      return patients;
    },
  },

  patient: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const patient = PatientModel.findById(params.id).exec();
      if (!patient) {
        throw new Error("patient not found");
      }
      return patient;
    },
  },
};

export const patientMutation = {
  signUpPatient: {
    type: patientType,
    args: {
      // studentNo: {
      //   type: new GraphQLNonNull(GraphQLString),
      // },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      address: {
        type: new GraphQLNonNull(GraphQLString),
      },
      phoneNumber: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const hashed = await bcrypt.hashSync(params.password, 10);

      const patientModel = new PatientModel({
        ...params,
        password: hashed,
      });

      const newPatient = patientModel.save();
      if (!newPatient) {
        throw new Error("Could not save the patient!");
      }
      return newPatient;
    },
  },

  loginPatient: {
    type: new GraphQLObjectType({
      name: "loginPatient",
      fields: () => ({
        token: { type: GraphQLString },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, params) => {
      const patient = await PatientModel.findOne({
        email: params.email,
      }).exec();
      if (!patient) {
        throw new Error("Login failed!");
      }

      const valid = await bcrypt.compareSync(params.password, patient.password);

      if (!valid) {
        throw new Error("Password did not match!");
      }

      const token = jwt.sign({ _id: patient._id }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });

      return {
        token,
      };
    },
  },
  verifyPatient: { 
      type: patientType,
      args: {
          token: {
              type: new GraphQLNonNull(GraphQLString),
          },
      },
      resolve: async function (root, params) {
          const { _id } = jwt.verify(params.token, jwtKey);

          const patient = await PatientModel.findById(_id).exec();
          if (!patient) {
              throw new Error("Patient not found");
          }
          return patient;
      }
  },

  deletePatient: {
    type: patientType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, params) {
      const deletePatient = PatientModel.findByIdAndRemove(params.id).exec();
      if (!deletePatient) {
        throw new Error("Could not delete the patient!");
      }
      return deletePatient;
    },
  },
};