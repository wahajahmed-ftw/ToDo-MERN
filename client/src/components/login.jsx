import React from "react";
import { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function Login() {
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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8001/auth/login",
        formData,
        {withCredentials: true} 
      );
      if (response.status === 200) {
        console.log("Done",response);
        window.location.href = "/form"; 
      } else {
        console.log("There was a problem", response.data);
      }
    } catch (error) {
      console.log("An error occuredh", error);
    }
  };

  return (
      <div>
        <h1>Login Page</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
