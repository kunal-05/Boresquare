import React, { useState } from "react";
import { UPLOAD_LOCATIONS, MY_LOCATIONS } from "../queries";
import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from 'validator';
import {useNavigate} from 'react-router-dom';


const LocationForm = () => {
  const navigate = useNavigate();
  const [uploadLocation] = useMutation(UPLOAD_LOCATIONS, {
    refetchQueries: [{ query: MY_LOCATIONS }],
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        await uploadLocation({
          variables: formData,
        });
        setFormData({ name: "", address: "", image: "" });
        navigate('/my-locations');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    formData.name  = formData.name.trim()
    formData.address  = formData.address.trim()
    formData.image  = formData.image.trim()

    if(formData.name.length===0){
      errors.name = "Name is required";
      isValid = false;
      alert(errors.name)
    }
    if (!formData.address) {
      errors.address = "Address is required";
      isValid = false;
      alert(errors.address)
    }
    if (!formData.image) {
      errors.image = "Image URL is required";
      isValid = false;
      alert(errors.image)
    }
    if (!validator.isURL(formData.image)) {
      errors.image = "Image is not of type URL";
      isValid = false;
      alert(errors.image)
    }
    
    return isValid;
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems:'center' }}
    >
      <TextField
        label="Location Name"
        name="name"
        variant="outlined"
        value={formData.name}
        onChange={handleInputChange}
        margin="normal"
        required
        error={errors.name ? true : false}
        helperText={errors.name}
      />
      <TextField
        label="Address"
        name="address"
        variant="outlined"
        value={formData.address}
        onChange={handleInputChange}
        margin="normal"
        required
        error={errors.address ? true : false}
        helperText={errors.address}
      />
      <TextField
        label="Image URL"
        name="image"
        variant="outlined"
        value={formData.image}
        onChange={handleInputChange}
        margin="normal"
        required
        error={errors.image ? true : false}
        helperText={errors.image}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default LocationForm;
