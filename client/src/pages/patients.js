import React,{lazy} from 'react';

/*
Allow the nurse to enter vital signs:
body temperature, heart rate, blood
pressure, or respiratory rate.
*/

import { GET_ALL_PATIENTS } from '../graphql/patient';
import { useQuery } from '@apollo/client';
const PatientsTable  = lazy(()=> import('../components/tables/PatientsTable'));

const PatientsPage = () => {
  const { data } = useQuery(GET_ALL_PATIENTS);

  return (
    <>
      <h1>Patients</h1>

      <PatientsTable patients={data?.patients ?? []} />
    </>
  )
};

export default PatientsPage;