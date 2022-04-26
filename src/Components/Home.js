import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Form from "./Form";

const Home = () => {
  const [gender, setGender] = useState({
    male: true,
    female: true,
  });

  const [userRawList, setUserRawList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [input, setInput] = useState();

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    setGender((state) => ({ ...gender, [name]: !state[name] }));
  };

  useEffect(() => {
    const users = userRawList.filter((val) => {
      if (gender.male && val?.gender?.toLowerCase() == "male") return true;
      else if (gender.female && val?.gender?.toLowerCase() == "female")
        return true;
      else return false;
    });

    setUserList(users);
    console.log("users: ", users);
  }, [gender]);

  const loadUser = () => {
    axios
      .get("http://localhost:8888/users")
      .then((response) => {
        setUserRawList(response.data);
        setUserList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const pattern = new RegExp(input, "i");
    const fil = userRawList.filter((val) => {
      return (
        pattern.test(val.first_name) ||
        pattern.test(val.last_name) ||
        pattern.test(val.email)
      );
    });
    {
      fil && setUserList(fil);
    }
    console.log(fil);
  }, [input]);

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <h1>Candidates</h1>
      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <Checkbox
            checked={gender.male}
            onChange={handleGenderChange}
            name="male"
            value="Male"
            inputProps={{ "aria-label": "controlled" }}
          />
          <h3>Male</h3>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            checked={gender.female}
            onChange={handleGenderChange}
            name="female"
            value="Female"
            inputProps={{ "aria-label": "controlled" }}
          />
          <h3>Female</h3>
        </div>
        <div>
          <input
            type="search"
            placeholder="What are You Looking For ?"
            style={{
              border: "none",
              borderBottom: "1px solid gray",
              width: "max-content",
            }}
            onChange={handleChange}
          />
        </div>
      </section>
      <div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>first Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(({ id, first_name, last_name, gender, email }, i) => {
              return (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Form loadUser={loadUser} />
    </div>
  );
};

export default Home;
