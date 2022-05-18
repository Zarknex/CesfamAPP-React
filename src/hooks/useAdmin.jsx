import useAuth from "./useAuth";

const useAdmin = () => {
  const {auth} = useAuth();

  return auth.typeUser === "administrator"
}

export default useAdmin;