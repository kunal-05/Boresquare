import "../../App.css";
import {useMutation } from "@apollo/client";
import {DELETE_LOCATIONS, MY_LOCATIONS } from "../../queries";
import { Button } from "@mui/material";

function DeleteModal(props) {
  const [deleteLocation] = useMutation(DELETE_LOCATIONS,{
    refetchQueries: [{ query: MY_LOCATIONS }]})
  const handleDelete = async() => {
    try{
      deleteLocation({
      variables: {
        id: (props.locationinfo.id)
      },
    });
}
catch(e){
    console.log(e)
}
  };
  return (
   
    <Button onClick={handleDelete}>
      Delete
    </Button>
      
  );
}

export default DeleteModal;
