import { Routes, Route } from "react-router"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/useThemeStore"
import { Toaster } from "react-hot-toast"

function App() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={`${theme}`}>

      <Routes>
        <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path='/product/:id' element={<ProductPage />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
