import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [prescription, setPrescription] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalFormPrescription, setModalFormPrescription] = useState(false);
  const [modalDeletePrescription, setModalDeletePrescription] = useState(false);
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

    const getPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/prescriptions", config);
        setPrescriptions(data);
      } catch (error) {
        console.log();
      }
    };
    getPrescriptions();
    setLoading(false);
  }, [user]);

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
    setPrescription({});
  };

  const submitPrescription = async (prescription) => {
    if (prescription?.id) {
      await editPrescription(prescription);
    } else {
      await newPrescription(prescription);
    }
  };

  const newPrescription = async (prescription) => {
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

      const updatedUser = { ...prescription };
      updatedUser.prescriptions = [...user.prescriptions, data];
      console.log(updatedUser);
      setUser(updatedUser);
      setAlert({});
      setModalFormPrescription(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editPrescription = async (prescription) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        "/prescriptions",
        prescription,
        config
      );

      const updatedUser = { ...user };
      updatedUser.prescriptions = updatedUser.prescriptions.map(
        (prescriptionState) =>
          prescriptionState._id === data._id ? data : prescriptionState
      );

      setUser(updatedUser);
      setAlert({});
      setModalFormPrescription(false);
    } catch (error) {}
  };

  const handleModalEditPrescription = (prescription) => {
    setPrescription(prescription);
    setModalFormPrescription(true);
  };

  const handleModalDeletePrescription = (prescription) => {
    setPrescription(prescription);
    setModalDeletePrescription(!modalDeletePrescription);
  };

  const deletePrescription = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(
        `/prescriptions/${prescription._id}`,
        config
      );
      setAlert({
        msg: data.msg,
        error: false,
      });

      const updatedUser = { ...user };
      updatedUser.prescriptions = updatedUser.prescriptions.filter(
        (prescriptionState) => prescriptionState._id !== prescription._id
      );
      setUser(updatedUser);
      setModalDeletePrescription(false);
      setPrescription({});
    } catch (error) {
      console.log();
    }
  };

  const getPrescription = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/prescriptions/${id}`, config);
      setPrescription(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMail = async (id) => {
    try {
      getUser(id);

      const payload = {
        email: user.email,
        //name: user.name
      }

      const {data} = await axiosClient.post("/users/mail",payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendWsp = async (id) => {
    try {
      getUser(id);
      const userPhone = user.phone

      const payload = {
        message: `Estimado ${user.name} Sus medicamentos estan listos para su retiro. \nPor favor no responda este mensaje ya que es automatizado.\n CESFAM`,
        number: userPhone,
      };
      const { data } = await axiosClient.post("/", payload);
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
        handleModalEditPrescription,
        deletePrescription,
        prescription,
        prescriptions,
        getPrescription,
        handleModalDeletePrescription,
        modalDeletePrescription,
        sendMail,
        sendWsp,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
