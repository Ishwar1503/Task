import { Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Form = ({ loadUser }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/users", form)
      .then(() => {
        alert("user Added");
        loadUser();
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(form);
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5px",
        }}
      >
        <div
          item
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            label="First Name"
            name="first_name"
            onChange={handleChangeForm}
            fullWidth
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            onChange={handleChangeForm}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <section
            style={{
              display: "flex",
              justifyContent: "start",
              width: "50%",
            }}
          >
            <TextField
              label="Email"
              fullWidth
              name="email"
              onChange={handleChangeForm}
            />
          </section>
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "50%",
            }}
          >
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChangeForm}
                value="Male"
              />
              Male
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChangeForm}
                value="Female"
              />
              Female
            </div>
          </section>
        </div>
        <button onClick={handleSubmitForm}>Add</button>
      </form>
    </div>
  );
};

export default Form;
