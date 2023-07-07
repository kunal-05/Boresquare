import { useQuery } from "@apollo/client";
import { GET_LIKED_LOCATIONS } from "../queries";
import Wrapper from "./Wrapper";
let message = "";
function LikeLocation() {
  const { loading, error, data } = useQuery(GET_LIKED_LOCATIONS, {
    fetchPolicy: "cache-and-network",
  });
  const showDelete = false;
  const myplaces = false;
  const addLocation = false;
  const locationapi = false;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <Wrapper
      message={message}
      locationapi={locationapi}
      addLocation={addLocation}
      showDelete={showDelete}
      myplaces={myplaces}
      locations={data}
    />
  );
}
export default LikeLocation;
