// React
import { useContext } from "react";

// Context
import { AuthContext } from "../contexts/AuthProvider"

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('you cannot use this context here');
  return context;
}

export { useAuth }
