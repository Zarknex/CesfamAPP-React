import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormPrescription, setModalFormPrescription] = useState(false);
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
      await editUser(user);
    } else {
      await newUser(user);
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

      //Sincronizar state
      const updatedUsers = users.map((userState) =>
        userState._id === data._id ? data : userState
      );
      setUsers(updatedUsers);
      //Alert
      setAlert({
        msg: "Usuario actualizado correctamente",
        error: false,
      });
      //Redireccionar
      setTimeout(() => {
        setAlert({});
        navigate("/crm");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

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
  };

  const getUser = async (id) => {
    setLoading(true);
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

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete(`/users/${id}`, config);

      const updatedUser = users.filter((userState) => userState._id !== id);
      setUsers(updatedUser);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/crm");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalPrescription = () => {
    setModalFormPrescription(!modalFormPrescription);
  };

  const submitPrescription = async (prescription) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/prescriptions",
        prescription,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
        deleteUser,
        modalFormPrescription,
        handleModalPrescription,
        submitPrescription,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
