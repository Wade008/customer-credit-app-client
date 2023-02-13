

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./components/navigation/NavBar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

import './App.css';





function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main />} errorElement={<NotFound />} >
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route >
    )
  )


  return (
 
      <RouterProvider router={router} />

  );
}

function Main() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}




export default App;
