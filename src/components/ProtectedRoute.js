import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { userLog, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;
  if (!userLog) return <Navigate to="/user" />;

  return <>{children}</>;
};

export default ProtectedRoute;
