import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LikeModal from "../components/modal/LikeModal";
import DeleteModal from "../components/modal/DeleteModal";
import { useState } from "react";
import {
    NavLink
  } from "react-router-dom";

let itemsPerPage = 10;
let flag = 0;
let itemsForPage = 0;
function Wrapper(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  if (props.locationapi) {
    itemsForPage = props.locations.locationPosts.slice(0, endIndex);
    flag = props.locations.locationPosts.length;
  } else if (props.myplaces) {
    itemsForPage = props.locations.userPostedLocations.slice(
      0,
      endIndex
    );
    flag = props.locations.userPostedLocations.length;
  } else {
    itemsForPage = props.locations.likedLocations.slice(0, endIndex);
    flag = props.locations.likedLocations.length;
  }

  
  const handleGetMore = () => {
    setCurrentPage(currentPage + 1);
    const newItems = props.locationapi
      ? props.locations.locationPosts.slice(startIndex, endIndex)
      : props.myplaces
      ? props.locations.userPostedLocations.slice(startIndex, endIndex)
      : props.locations.likedLocations.slice(startIndex, endIndex);
    itemsForPage = itemsForPage.concat(newItems);
  };

  return (
    <div>
        <div class="location">
        {props.myplaces && props.myplaces && (
              
                 <NavLink sx={{align:"right"}} className="navlink-new" to="/new-location">
                   Add New Location
                 </NavLink>
              
              )}
    </div>
    <br>
    </br>
      <br></br>
      <br></br>
      <Grid container spacing={2}>
        {itemsForPage.map((location) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={location.id}>
            <Card
              sx={{
                maxWidth: 450,
                height: 550,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 5,
                border: "1px solid #1e8678",
                boxShadow:
                  "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {location.name}
                  </Typography>
                }
              />
              <CardMedia component="img" height="300" image={location.image} />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Address: {location.address}{" "}
                  </Typography>
                </Typography>
              </CardContent>
              {props.showDelete && props.showDelete && (
                <DeleteModal
                  myplaces={props.myplaces}
                  locationinfo={location}
                />
              )}

              <LikeModal locationinfo={location} />
            </Card>
          </Grid>
        ))}
      </Grid>
      {endIndex < flag && (
        <button className="get-more-btn" onClick={handleGetMore}>
          Get More
        </button>
      )}
    </div>
  );
}
export default Wrapper;
