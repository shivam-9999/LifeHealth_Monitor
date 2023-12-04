import React,{lazy} from 'react';
/*
Allow the patient to send daily motivational
tips to the patient (by storing them
  in the database and providing a daily
  tips page for the patient to view, etc.).
*/

import { GET_ALL_MOTIVATIONAL_VIDEOS } from '../graphql/motivationalVideos';
import { useQuery } from '@apollo/client';
import { Stack } from 'react-bootstrap';

const NewMotivationalVideos = lazy(()=> import('../components/modals/NewMotivationalVideos'));

import { useAuth } from '../hooks/useAuth';
const MotivationalVideoCard = lazy(()=> import('../components/MotivationalVideoCard'));

const MotivationalVideosPage = () => {
  const { data } = useQuery(GET_ALL_MOTIVATIONAL_VIDEOS);

  const { role } = useAuth();

  return (
    <>
      <h1>Motivational Videos</h1>
      <p>Here are some motivational videos to keep your life going!</p>

      { role === 'nurse' && <NewMotivationalVideos /> }

      <Stack gap={3}>
        { data?.motivationalVideos?.map((video) => (
          <MotivationalVideoCard
            key={video._id}
            data={video}
          />
        ))}
      </Stack>
    </>
  )
};

export default MotivationalVideosPage;