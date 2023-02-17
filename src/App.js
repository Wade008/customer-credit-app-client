
import { useReducer, useState } from "react";

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
import CreditValue from "./components/CreditValue";

import ProtectedRoute from "./components/ProtectedRoute";

import { GlobalContext } from "./components/utils/globalStateContext";
import globalReducer from "./components/reducers/globalReducer";
import Global from "./components/styled/Global";
import { customerList } from "./components/dummydata/dummy";
import CustomerDetails from "./components/CustomerDetails";


function App() {


  const initialState = {
    userName: "",
    token: "",
  }


  const initialCustomers = customerList

  const [store, dispatch] = useReducer(globalReducer, initialState)
  const [customers, setCustomers] = useState(initialCustomers)

  const addCustomer = (customer) => {

    setCustomers((prevCustomers) => {
      return [
        ...prevCustomers,
        { id: prevCustomers.length + 1, ...customer }
      ]
    }
    );
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main />} errorElement={<NotFound />} >
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard customers={customers} />} />
          <Route path="dashboard/profile" element={<Profile />} />
          <Route path="dashboard/addcustomer" element={<NewCustomer add={addCustomer} />} />
          <Route path="dashboard/creditvalue" element={<CreditValue  />} />
          <Route path="dashboard/:custId" element={<CustomerDetails  />} />
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
