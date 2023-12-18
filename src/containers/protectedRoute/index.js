import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthorized, children, waiting }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized && !waiting) {
      navigate("/");
    }
  }, [waiting, isAuthorized]);

  return children;
};

export default ProtectedRoute;
