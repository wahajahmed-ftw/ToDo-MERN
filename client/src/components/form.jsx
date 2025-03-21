import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

export default function Form() {
  const [Data, setData] = useState({
    title: "",
    description: "",
    isDone: false,
  });
  const [tableData, settableData] = useState([]);
  const [isopen, setIsopen] = useState(false);
  const [id, setId] = useState("");
  const [editId, setEditId] = useState({
    title: "",
    description: "",
    isDone: false,
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(Data);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      console.log("Add token", token);
      const response = await axios.post(
        "http://localhost:8001/tasks/add",
        Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      window.location.reload()
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        console.log(token);
        const response = await axios.get("http://localhost:8001/tasks/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response.data);
        settableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const HandleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData({
      ...Data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.delete(
        `http://localhost:8001/tasks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedData = tableData.filter((item) => item._id !== id);
        settableData(updatedData);
      }
    } catch (e) {
      console.log("Error ho gaya", err);
    }
  };
  const HandleEditChange = (e) => {
    console.log("Inside edit data");
    const { name, type, value, checked } = e.target;
    setEditId({
      ...editId,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const HandleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      console.log(editId);
      const response = await axios.patch(
        `http://localhost:8001/tasks/update/${id}`,
        editId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Done");
        setIsopen(false);
      }
    } catch (err) {
      console.log("Error ho gaya", err);
    }
  };

  const HandleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post("http://localhost:8001/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        Cookies.remove("token");
        console.log("Done");
        window.location.href = "/login";
      }
    } catch (err) {
      console.log("Error ho gaya", err);
    }
  };
  return (
    <div>
      <button onClick={HandleLogout}>Logout</button>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Name"
          onChange={HandleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={HandleChange}
        />
        <label>
          Done?
          <input type="checkbox" name="isDone" onChange={HandleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.isDone ? "Yes" : "No"}</td>
                <button onClick={() => handleDelete(item._id)}>
                  Delete Task
                </button>
                <button
                  onClick={() => {
                    setIsopen(true);
                    setId(item._id);
                    setEditId({
                      ...editId,
                      name: item.title,
                      description: item.description,
                      isDone: item.isDone,
                    });
                  }}
                >
                  Edit Task
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isopen && (
        <div>
          <h1>Edit</h1>
          <form onSubmit={HandleEdit}>
            <input
              type="text"
              name="title"
              placeholder="name "
              value={editId.title}
              onChange={HandleEditChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editId.description}
              onChange={HandleEditChange}
            />
            <label>
              Done?
              <input
                type="checkbox"
                name="isDone"
                value={editId.isDone}
                onChange={HandleEditChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
