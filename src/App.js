
import { useEffect, useReducer, useState } from "react";

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
import NewCustomer from "./components/NewCustomer";
import CreditValue from "./components/CreditValue";
import ProtectedRoute from "./components/ProtectedRoute";
import { GlobalContext } from "./components/utils/globalStateContext";
import globalReducer from "./components/reducers/globalReducer";
import Global from "./components/styled/Global";
import CustomerDetails from "./components/CustomerDetails";
import Message from "./components/Message";
import axios from "axios";



function App() {


  const initialAuthState = {
    userName: "",
    token: "",
  }

  const [store, dispatch] = useReducer(globalReducer, initialAuthState)

  const [customers, setCustomers] = useState([])

  const [currentUser, setCurrentUser] = useState({})

  // console.log(currentUser)
  // console.log(customers)


  useEffect(() => {

    const getUser = async () => {

      try {
        const response = await axios.get("auth/profile")
        setCurrentUser(response.data)
      }
      catch (err) {
        setCurrentUser({})
        console.log(err)
      }
    }


    const getCustomers = async () => {
      try {
        const response = await axios.get("/customers")
        setCustomers(response.data)
      }
      catch (err) {
        setCustomers([])
        console.log(err)
      }
    }

    if (store.token) {

      getUser();
      getCustomers();

    }



  }, [store.token])


  //update user info
  const updateUser = (userDetails) => {

    setCurrentUser(userDetails)
  }

  //update store credit value

  const updateStoreCredit = (newCredit) => {

    setCurrentUser((othercurrentUser) => {
      return {
        othercurrentUser,
        ...{ creditvalue: newCredit }
      }

    })

  }


  const addCustomer = (customer) => {

    setCustomers((prevCustomers) => {
      return [
        ...prevCustomers,
        { id: prevCustomers.length + 1, ...customer }
      ]
    }
    );
  }

  //update customer

  const updateCustomer = (custId, updatedCustomer) => {

    let newCustomers = customers.map((customer) => {
      if (String(customer.id) === custId) {

        //replace with new customer
        return updatedCustomer;
      }
      return customer;

    })
    setCustomers(newCustomers);

  }

  //delete a customer

  const deleteCustomer = (custId) => {

    let newCustomers = customers.filter((customer) => {
      return String(customer.id) !== custId
    })

    setCustomers(newCustomers);

  }

  //empty state on logout
  const onLogout = () => {
    setCustomers([])
    setCurrentUser({})
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main onLogout={onLogout} />} errorElement={<NotFound />} >
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard
            customers={customers}
            storeCredit={currentUser.creditvalue}
            currentUser={currentUser} />} />
          <Route path="dashboard/message" element={<Message />} />
          <Route path="dashboard/profile" element={<Profile currentUser={currentUser} updateUser={updateUser} />} />
          <Route path="dashboard/addcustomer" element={<NewCustomer addCustomer={addCustomer} />} />
          <Route path="dashboard/creditvalue" element={<CreditValue
            setCreditValue={updateStoreCredit}
            storeCredit={currentUser.creditvalue} />} />
          <Route path="dashboard/:custId" element={<CustomerDetails
            deleteCustomer={deleteCustomer}
            updateCustomer={updateCustomer}
            customers={customers} />}
          />
        </Route>


      </Route >
    )
  )
  useEffect(() => {
    // const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    if (token) {
      dispatch({
        type: "setToken",
        data: token,
      })
    }
  }, [])

  return (

    <div>
      <GlobalContext.Provider value={{ store, dispatch }}>
        <Global />
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>

  );
}

function Main(props) {

  const { onLogout } = props;

  return (
    <>
      <NavBar onLogout={onLogout} />
      <Outlet />
    </>
  )
}




export default App;
