import React, { Component, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";

function UpdatePet({ setData }) {
  const location = useLocation();
  const { data } = location.state;

  const [pet, setPet] = useState(data);

  function handleChange(e) {
    // e is the event
    const newdata = { ...pet };
    newdata[e.target.id] = e.target.value;
    setPet(newdata);
    console.log(pet);
  }

  console.log(pet.id);

  function submit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3006/pets/${pet.id}`, {
        name: pet.name,
        age: pet.type,
        animal_type: pet.animal_type,
      })
      .then((res) => {
        setData((prevData) => {
          const index = prevData.findIndex((item) => item.id === data.id);
          const newData = prevData.splice(index, 1, res);
          return newData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid
      container
      align="center"
      justify="center"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "100px", maxHeight: "100vh" }}
      spacing={4}
      xs={12}
      md={12}
      lg={12}
    >
      <Grid item>
        <Typography>{pet.name}</Typography>
        <form>
          <label>Pet info</label>
          <input
            onChange={(e) => handleChange(e)}
            placeholder="name"
            id="name"
            value={pet.name}
          />
          <input
            onChange={(e) => handleChange(e)}
            placeholder="age"
            id="age"
            value={pet.age}
          />
          <input
            onChange={(e) => handleChange(e)}
            placeholder="Breed"
            id="animal_type"
            value={pet.animal_type}
          />
        </form>
        <button onClick={(e) => submit(e)} type="submit">
          Submit
        </button>
      </Grid>
    </Grid>
  );
}

export default UpdatePet;
