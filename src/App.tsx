import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/AllRoutes"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App
