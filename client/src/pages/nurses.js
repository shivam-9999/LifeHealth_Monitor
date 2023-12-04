import React,{lazy} from 'react';


/*
Allow the nurse to enter vital signs:
body temperature, heart rate, blood
pressure, or respiratory rate.
*/

import { GET_ALL_NURSES } from '../graphql/nurse';
import { useQuery } from '@apollo/client';
const NursesTable = lazy(()=> import('../components/tables/NursesTable'));

const NursesPage = () => {
  const { data } = useQuery(GET_ALL_NURSES);

  return (
    <>
      <h1>Nurses</h1>

      <NursesTable nurses={data?.nurses ?? []} />
    </>
  )
};

export default NursesPage;