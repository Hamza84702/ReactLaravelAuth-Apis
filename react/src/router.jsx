import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";

// Define your routes array
const routes = [
  {
    path: "/",
    element: <DefaultLayout />, 
    children:[
      {
        path: "/",
        element: <Navigate to="/users" />, 
      },
      {
        path: "/users",
        element: <Users />, 
      },
      {
        path: "/dashboard",
        element: <Dashboard />, 
      },
    ]
  },
  {
    path: "/",
    element: <GuestLayout />, 
    children:[
      {
        path: "/login",
        element: <Login />, 
      },
      {
        path: "/signup",
        element: <Signup />, 
      },
    ]
  },
  
  
  {
    path: "*",
    element: <NotFound />, 
  }
  
];

// Create the router
const router = createBrowserRouter(routes);

export default router;
