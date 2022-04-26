import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Loader from "../Loader";

const ProtectedRouteAdmin = ({ children }) => {
  const { userLog, loading } = useAuth();
  console.log(userLog);

  if (loading) return <Loader />;
  if (!userLog) return <Navigate to="/user" />;
  if (userLog.rol !== "admin") return <Navigate to="/user" />;

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
