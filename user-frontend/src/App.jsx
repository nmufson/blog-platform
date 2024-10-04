import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn/LogIn";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Main from "./pages/Main"; // This is your layout component
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Layout from "./components/Layout/Layout";
import BlogPost from "./pages/BlogPost/BlogPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> }, // Home page
      { path: "about", element: <About /> }, // About page
      { path: "login", element: <LogIn /> },
      {
        path: "posts/:postId", // Dynamic route for a specific blog post
        element: <BlogPost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
