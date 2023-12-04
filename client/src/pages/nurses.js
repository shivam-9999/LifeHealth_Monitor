import React,{lazy} from 'react';
import { GET_ALL_NURSES } from '../graphql/nurse';
import { useQuery } from '@apollo/client';
import NursesTable from ('../components/tables/NursesTable');

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