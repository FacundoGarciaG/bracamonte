import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { userLog, loading } = useAuth();

  if (loading) return <Loader />;
  if (!userLog) return <Navigate to="/user" />;

  return <>{children}</>;
};

export default ProtectedRoute;
