import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import HeaderCrm from "./HeaderCrm";
import SidebarCrm from "./SidebarCrm";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return 'loading...'
  

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <HeaderCrm />
          <div className="md:flex md:min-h-screen">
            <SidebarCrm />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
