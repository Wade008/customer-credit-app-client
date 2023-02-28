
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
import { customerList, accountInfo } from "./components/dummydata/dummy";
import CustomerDetails from "./components/CustomerDetails";
import Message from "./components/Message";
import axios from "axios";



function App() {


  const initialAuthState = {
    userName: "",
    token: "",
  }


  const initialCustomers = customerList

  const [store, dispatch] = useReducer(globalReducer, initialAuthState)

  const [customers, setCustomers] = useState(initialCustomers)

  const [currentUser, setCurrentUser] = useState({})



  useEffect(() => {

    if (store.token) {
      axios
        .get("auth/profile")
        .then((res) => res.data)
        .then((json) => {
          setCurrentUser(json)
        })
        .catch((err) => {
          setCurrentUser({})
          console.log(err)
        })
    }

  }, [store.token])



  // //set user info after successful registration or login
  const initialiseUser = () => {
    // setUrl(url);
  }


  //update user info
  const updateUser = (userDetails) => {

    setCurrentUser(userDetails)
  }

  //update store credit value

  const updateStoreCredit = (newCredit) => {

    setCurrentUser((othercurrentUser) => {
      return {
        othercurrentUser,
        ... { creditvalue: newCredit }
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main />} errorElement={<NotFound />} >
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
      // dispatch({
      //   type: "setUserName",
      //   data: username,
      // })
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

function Main() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}




export default App;
