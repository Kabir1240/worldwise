import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/AllRoutes"
import { CityProvider } from "./contexts/CitiesProvider"


function App() {
  return (
    <CityProvider>
     <BrowserRouter>
        <AllRoutes />
     </BrowserRouter>
    </CityProvider>
  )
}

export default App
