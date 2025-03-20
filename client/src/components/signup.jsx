import React from "react";
import { useState } from "react";
import axios from "axios";

export default Signup = () => {
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    e.preventDefault();
    SetFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSubmit = async (e) => {};

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={HandleChange}
          placeholder="Name"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={HandleChange}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={HandleChange}
          placeholder="Password"
        />
      </form>
    </div>
  );
};
