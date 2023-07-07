import { useQuery } from "@apollo/client";
import { GET_LOCATION_POSTS } from "../queries";
import { CircularProgress } from '@mui/material';
import Wrapper from "./Wrapper";

function LocationList() {
  const { loading, error, data } = useQuery(GET_LOCATION_POSTS, {
    fetchPolicy: "cache-and-network",
  });
  const showDelete = false;
  const myplaces = false;
  const addLocation = false;
  const locationapi = true;
  if (loading){
    return(
        <CircularProgress></CircularProgress>
    )
  } 
  if (error) return <p>Could Not retrieve data. Please try again later</p>;
  //const locations = data.locationPosts;

  return (
    <Wrapper
      locationapi={locationapi}
      addLocation={addLocation}
      showDelete={showDelete}
      myplaces={myplaces}
      locations={data}
    />
  );
}
export default LocationList;
