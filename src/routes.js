import { Navigate, useRoutes, Route } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import List from "./pages/list/List";
import { userColumns, propertiesColumns } from "./datatablesource";
import List2 from "./pages/list2/List2";
import NewProperties from "./pages/newproperties/NewProperties";
import New from "./pages/new/New";
import Register from "./sections/auth/Register";
import RegisterPage from "./pages/RegisterPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        { path: "app", element: <DashboardAppPage /> },
        // { path: 'user', element: <UserPage /> },
        { path: "user", element: <List columns={userColumns} /> },
        { path: "blog", element: <List2 columns={propertiesColumns} /> },

        // { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: "/dashboard/new",
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard/new", element: <NewProperties /> },

        // { path: 'products', element: <ProductsPage /> },
      ],
    },

    { path: "/dashboard/news", element: <New /> },
  ]);

  return routes;
}
