import React from "react";
import "../../App.css";
import {useMutation } from "@apollo/client";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {UPDATE_LOCATIONS, GET_LIKED_LOCATIONS } from "../../queries";
import { Button } from "@mui/material";

function LikeModal(props) {
  const [updateLocation] = useMutation(UPDATE_LOCATIONS,{
    refetchQueries: [{ query: GET_LIKED_LOCATIONS }],})
  const handleLike = async() => {
    try{
     updateLocation({
      variables: {
        id: (props.locationinfo.id),
        name: (props.locationinfo.name),
        address:(props.locationinfo.address),
        image:(props.locationinfo.image),
        userPosted:(props.locationinfo.userPosted),
        liked: !props.locationinfo.liked
      },
    });
}
catch(e){
    console.log(e)
}
  };
  return (
   
    <Button onClick={handleLike}>
      {props.locationinfo.liked? <ThumbDownIcon /> : <ThumbUpIcon />}
     
    </Button>
      
  );
}

export default LikeModal;
