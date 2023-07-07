import { useQuery } from "@apollo/client";
import { MY_LOCATIONS } from "../queries";
import Wrapper from "./Wrapper";
import { CircularProgress } from '@mui/material';

function MyLocations() {
  const { loading, error, data } = useQuery(MY_LOCATIONS, {
    fetchPolicy: "cache-and-network",
  });
  const showDelete = true;
  const myplaces = true;

  if (loading){
    return(
        <CircularProgress></CircularProgress>
    )
  } 
  if (error) return <p>{error.message}</p>;

  //const locations = data.userPostedLocations;

  return (
    <Wrapper showDelete={showDelete} locations={data} myplaces={myplaces} />
  );
}
export default MyLocations;
