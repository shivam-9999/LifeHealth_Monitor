import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import {
  patientQuery,
  patientMutation
} from './patientSchemas.js';

import {
  nurseQuery,
  nurseMutation
} from './nurseSchemas.js';

import {
  healthQuery,
  healthMutation
} from './healthSchemas.js';

import {
  emergencyQuery,
  emergencyMutation
} from './emergencySchemas.js';

import {
  tipQuery,
  tipMutation
} from './tipSchemas.js';

import {
  symptomQuery,
  symptomMutation
} from './symptomSchemas.js';

import {
  motivationalVideoQuery,
  motivationalVideoMutation
} from './motivationalVideoSchemas.js';

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      ...patientQuery,
      ...nurseQuery,
      ...healthQuery,
      ...emergencyQuery,
      ...tipQuery,
      ...symptomQuery,
      ...motivationalVideoQuery,
    };
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      ...patientMutation,
      ...nurseMutation,
      ...healthMutation,
      ...emergencyMutation,
      ...tipMutation,
      ...symptomMutation,
      ...motivationalVideoMutation,
    };
  },
});

const schema = new GraphQLSchema({ query: queryType, mutation: mutation });

export default schema;