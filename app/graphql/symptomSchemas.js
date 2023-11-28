import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import pkg from 'graphql-iso-date';
const { GraphQLDate } = pkg;


import SymptomModel from '../models/symptomModel.js';
import { patientType } from './patientSchemas.js';


const symptomType = new GraphQLObjectType({
  name: "Symptom",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: patientType,
      },
      fever: {
        type: GraphQLBoolean,
      },
      cough: {
        type: GraphQLBoolean,
      },
      breathing_difficulty: {
        type: GraphQLBoolean,
      },
      headache: {
        type: GraphQLBoolean,
      },
      sore_throat: {
        type: GraphQLBoolean,
      },
      timestamp: {
        type: GraphQLDate,
      },
    };
  },
});

const symptomMutationType = new GraphQLObjectType({
  name: "SymptomMutation",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      patient: {
        type: GraphQLString,
      },
      fever: {
        type: GraphQLBoolean,
      },
      cough: {
        type: GraphQLBoolean,
      },
      breathing_difficulty: {
        type: GraphQLBoolean,
      },
      headache: {
        type: GraphQLBoolean,
      },
      sore_throat: {
        type: GraphQLBoolean,
      },
      timestamp: {
        type: GraphQLDate,
      },
    };
  },
});

export const symptomQuery = {

  symptomsByPatient: {
    type: new GraphQLList(symptomType),
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: function (root, params) {
      const symptoms = SymptomModel.find({ patient: params.patient })
        .populate("patient")
        .exec();
      if (!symptoms) {
        throw new Error("Symptoms not found");
      }
      return symptoms;
    },
  },

  symptom: {
    type: symptomType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const symptom = await SymptomModel.findById(params.id).populate("patient").exec();
      if (!symptom) {
        throw new Error("Symptom not found");
      }
      return symptom;
    },
  },
};

export const symptomMutation = {
  createSymptom: {
    type: symptomMutationType,
    args: {
      patient: {
        type: new GraphQLNonNull(GraphQLString),
      },
      fever: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      cough: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      breathing_difficulty: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      headache: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      sore_throat: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async function (root, params) {
      const symptomModel = new SymptomModel(params);

      const newSymptom = await symptomModel.save();
      if (!newSymptom) {
        throw new Error("Could not save the symptom data!");
      }
      return newSymptom;
    },
  },

  updateSymptom: {
    type: symptomMutationType,
    args: {
      id: {
        name: "id",
        type: new GraphQLNonNull(GraphQLString),
      },
      fever: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      cough: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      breathing_difficulty: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      headache: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      sore_throat: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async function (root, params) {
      const symptom = await SymptomModel.findByIdAndUpdate(
        params.id,
        {
          fever: params.fever,
          cough: params.cough,
          breathing_difficulty: params.breathing_difficulty,
          headache: params.headache,
          sore_throat: params.sore_throat,
        },
        { new: true }
      );
      if (!symptom) {
        throw new Error("Could not update the symptom data!");
      }
      return symptom;
    },
  },

  deleteSymptom: {
    type: symptomMutationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async function (root, params) {
      const symptom = await SymptomModel.findByIdAndDelete(params.id);
      if (!symptom) {
        throw new Error("Could not delete the symptom data!");
      }
      return symptom;
    }
  }
};


// module.exports = {
//   symptomQuery: queryType,
//   symptomMutation: Mutation,
// };