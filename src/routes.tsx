import { Navigate, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./components/Layouts/MainLayout";
import { Error404 } from "./pages/Error404";
import Transactions from "./pages/Transactions";
import CustomerManagement from "./pages/Customers";

const Login = lazy(() => import("./Login"));


interface Route {
  path: string,
  element: any
}

const routes = (loggedin: any) => {
  if (!loggedin) {
    return  createBrowserRouter([
      {
        path: '/',
        element:  <Navigate to="/login" replace={true} />
      },
      {
        path: "/login",
        element: <Login />,
      },
    ])
  }

  const userGroup = localStorage.getItem("userGroup")!
  const routes: Route[] = getUserRoutes(userGroup)
  return createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: routes,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);
}


const getUserRoutes = (group: string) => {

  switch (group) {
    case "SuperAdmin":
      return [
        { path: "/", element: <Navigate to="/transactions" />},
        { path: "/transactions", element: <Transactions /> },
        { path: "/customers", element: <CustomerManagement /> },
      ];
    case "Developers":
      return [
        { path: "/", element: <Navigate to="/customers" />},
        { path: "/customers", element: <CustomerManagement /> },
      ];
    case "Admin":
      return [
        { path: "/", element: <Navigate to="/transactions" />},
        { path: "/transactions", element: <Transactions /> },
        { path: "/customers", element: <CustomerManagement /> },
      ];
    case "CustomerSupport":
      return [
        { path: "/", element: <Navigate to="/customers" />},
        { path: "/customers", element: <CustomerManagement /> },
      ];
    case "FraudAnalyst":
      return [
        { path: "/", element: <Navigate to="/transactions" />},
        { path: "/transactions", element: <Transactions /> },
        { path: "/customers", element: <CustomerManagement /> },
      ];
    default:
      console.log("This user belongs to no group")
      return [ {
        path: "*",
        element: <Error404 />,
      }]
  }
};


export default routes;