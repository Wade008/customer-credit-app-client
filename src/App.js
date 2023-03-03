
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
// import Message from "./components/Message";
import axios from "axios";




function App() {


  const initialAuthState = {
    userName: "",
    token: "",
  }

  const [store, dispatch] = useReducer(globalReducer, initialAuthState)

  const [customers, setCustomers] = useState([])

  const [currentUser, setCurrentUser] = useState({})

  const [metrics, setMetrics] = useState({})

  const [message, setMessage] = useState("")


  //empty state on logout
  const onExit = () => {

    dispatch({
      type: "setToken",
      data: null,
    })

    setCustomers([])
    setCurrentUser({})
    setMetrics({})
  }


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


  //query metrics when customer, user state changes

  useEffect(() => {

    const getMetrics = async () => {

      try {
        const response = await axios.get("/metrics")
        setMetrics(response.data)
        console.log(response.data)

      }
      catch (err) {
        setMetrics({})
        console.log(err)
      }
    }

    if (store.token) {
      getMetrics();
    }

  }, [store.token, customers, currentUser])

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


  //update user info - this is a centralised axios function to deal with updating user details and store credit value 

  const updateCurrentUser = async (userDetails) => {

    try {
      const response = await axios.put("auth/profile", userDetails);
      // console.log(response.data?.error)
      //check if error message before updating state

      if (response.data?.error) {

        throw response.data.error
      }

      setCurrentUser(response.data)

      setMessage("Updated successfull!")

    }
    catch (err) {
      // console.log(err)
      setMessage("An error has occurred. Please try again")
    }
  }


  //update general user details

  const updateUser = (userDetails) => {

    updateCurrentUser(userDetails)
  }

  //update store credit value - also stored in the user collection

  const updateStoreCredit = (newCredit) => {

    let currentDetails = currentUser
    let updatedUser = {
      ...currentDetails,
      ...{ creditvalue: newCredit }
    }
    updateCurrentUser(updatedUser)

  }


  //delete a user

  const deleteUser = async () => {
    setMessage("")
    try {
      const response = await axios.delete("auth/profile")

      setMessage("You have successfully deleted your account. Sorry to see you go.")
      onExit();
    }
    catch (err) {
      setMessage("An error has occurred. Please try again")
    }

  }



  const addCustomer = async (customer) => {
    setMessage("")
    try {
      const response = await axios.post("/customers", customer)

      setCustomers((prevCustomers) => {
        return [
          ...prevCustomers,
          response.data]
      }
      )
      setMessage("Customer successfully added to the system")

    }
    catch (err) {
      setMessage("An error has occurred. Please try again")

    }

  }

  //update customer

  const updateCustomer = async (custId, updatedDetails) => {
    setMessage("")

    try {
      const response = await axios.put(`customers/${custId}`, updatedDetails)

      // console.log(updatedDetails.data)

      let newCustomers = customers.map((customer) => {
        if (customer._id === custId) {

          //replace with new customer
          return response.data
        }
        return customer;

      })
      // console.log(newCustomers)
      // update customers state to match the update
      setCustomers(newCustomers);
      setMessage("Customer details updated successfully");
    }
    catch (err) {
      setMessage("An error has occurred. Please try again")
    }

  }

  //delete a customer

  const deleteCustomer = async (custId) => {

    try {
      const response = await axios.delete(`customers/${custId}`)

      let newCustomers = customers.filter((customer) => {
        return customer._id !== response.data._id
      })

      setCustomers(newCustomers);
      setMessage("Customer has been deleted from the system");

    }
    catch (err) {
      setMessage("An error has occurred. Please try again")
    }

  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/" element={<Main onExit={onExit} />} errorElement={<NotFound />} >
        <Route path="/" element={<Home message={message} setMessage={setMessage} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard
            customers={customers}
            storeCredit={currentUser.creditvalue}
            currentUser={currentUser}
            message={message}
            setMessage={setMessage}
            metrics={metrics} />} />
          <Route path="dashboard/profile" element={<Profile
            currentUser={currentUser}
            updateUser={updateUser}
            message={message}
            deleteUser={deleteUser}
            onExit={onExit}
            setMessage={setMessage} />} />
          <Route path="dashboard/addcustomer" element={<NewCustomer
            addCustomer={addCustomer}
            message={message}
            setMessage={setMessage} />} />
          <Route path="dashboard/creditvalue" element={<CreditValue
            setCreditValue={updateStoreCredit}
            currentUser={currentUser}
            message={message}
            setMessage={setMessage} />} />
          <Route path="dashboard/:custId" element={<CustomerDetails
            deleteCustomer={deleteCustomer}
            updateCustomer={updateCustomer}
            customers={customers}
            message={message}
            setMessage={setMessage} />}
          />
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

function Main(props) {

  const { onExit } = props;

  return (
    <>
      <NavBar onExit={onExit} />
      <Outlet />
    </>
  )
}




export default App;
