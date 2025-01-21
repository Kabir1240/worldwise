import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/AllRoutes"
import { CityProvider } from "./contexts/CitiesProvider"
import { AuthProvider } from "./contexts/AuthProvider"


function App() {
  return (
    <AuthProvider>
      <CityProvider>
      <BrowserRouter>
          <AllRoutes />
      </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  )
}

export default App
