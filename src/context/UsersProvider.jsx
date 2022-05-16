import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/users/list", config);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitUser = async (user) => {
    if (user.id) {
      editUser(user);
    } else {
      newUser(user);
    }
  };

  const editUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(`/users/${user.id}`, user, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const newUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post("/users/register", user, config);
      setUsers([...users, data]);

      setAlert({
        msg: "Usuario registrado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/crm");
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const getUser = async (id) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/users/${id}`, config);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        showAlert,
        alert,
        submitUser,
        getUser,
        user,
        loading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
