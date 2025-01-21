import { createContext, useReducer } from "react";

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type User = {
  name: string,
  email: string,
  password: string,
  avatar?: string
} | null

// Create context
type AuthContextType = {
  user: User,
  isAuthenticated: boolean,
  login: (email: string, password: string) => void,
  logout: () => void
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext(defaultAuthContext);

// State Management
interface LoginAction {
  type: "login",
  payload: User
}

interface LogoutAction {
  type: "logout"
}

type action = LoginAction | LogoutAction

type state = {
  user: User,
  isAuthenticated: boolean,
}

const initialState: state = {
  user: null,
  isAuthenticated: false,
}

const reducer = (state: state, action: action): state => {
  switch (action.type) {
    case "login":
      console.log(action);
      if (!action.payload) return state
      return { ...state, user: { ...action.payload, password: "" }, isAuthenticated: true }
    case "logout":
      return {...state, user: null, isAuthenticated: false}
    default:
      throw new Error("action not recognized")
  }
}


// Provider
type AuthProviderType = {
  children: JSX.Element
}

const AuthProvider = ({ children }: AuthProviderType): JSX.Element => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  function login(email: string, password: string): void {
    if (!FAKE_USER) return
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type:"login", payload: FAKE_USER })
    } else {
      alert("wrong email or password")
    }
  }

  function logout(): void {
    dispatch({ type:"logout" })
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }