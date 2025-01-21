import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  })

  return (
    children
  )
}
