// React
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { lazy } from "react";

// components
// import Homepage from "../pages/Homepage";
// import Pricing from "../pages/Pricing";
// import Product from "../pages/Product";
// import AppLayout from "../pages/AppLayout";
// import PageNotFound from "../pages/PageNotFound";
// import Login from "../pages/Login";
// import CityList from "../components/CityList";
// import CountryList from "../components/CountryList";
// import City from "../components/City";
// import Form from "../components/Form";

// components lazy loaded to increase performance
const Homepage = lazy(() => import("../pages/Homepage"))
const Pricing = lazy(() => import("../pages/Pricing"))
const Product = lazy(() => import("../pages/Product"))
const AppLayout = lazy(() => import("../pages/AppLayout"))
const PageNotFound = lazy(() => import("../pages/PageNotFound"))
const Login = lazy(() => import("../pages/Login"))
const CityList = lazy(() => import("../components/CityList"))
const CountryList = lazy(() => import("../components/CountryList"))
const City = lazy(() => import("../components/City"))
const Form = lazy(() => import("../components/Form"))


export default function AllRoutes() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='product' element={<Product />} />
      <Route path='login' element={<Login />} />
      <Route path='app' element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate replace to="cities" />} />
        <Route path="cities" element={<CityList />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<CountryList />} />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}
