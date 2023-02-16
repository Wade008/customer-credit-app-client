
import { useReducer } from "react";

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
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import NewCustomer from "./components/NewCustomer";
import FindCustomer from "./components/FindCustomer";

import ProtectedRoute from "./components/ProtectedRoute";

import { GlobalContext } from "./components/utils/globalStateContext";
import globalReducer from "./components/reducers/globalReducer";
import Global from "./components/styled/Global";


function App() {


  const initialState = {
    userName: "",
    token: "",
  }

  const [store, dispatch] = useReducer(globalReducer, initialState)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main />} errorElement={<NotFound />} >
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/profile" element={<Profile />} />
          <Route path="dashboard/addcustomer" element={<NewCustomer />} />
          <Route path="dashboard/findcustomer" element={<FindCustomer />} />
        </Route>


      </Route >
    )
  )


  return (

    <div>
      <GlobalContext.Provider value={{ store, dispatch }}>
        <Global />
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>

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
