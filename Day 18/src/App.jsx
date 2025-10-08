import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProtectedRoute from "./layout/protected-route";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,  
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
