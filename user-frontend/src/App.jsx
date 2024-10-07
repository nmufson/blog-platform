import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { fetchLatestPostId } from "./services/blogPostService";

import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp.jsx";
import "./styles/index.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Layout from "./components/Layout/Layout";
import BlogPost from "./pages/BlogPost/BlogPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // Remove the loader from the root path
    children: [
      {
        path: "",
        loader: async () => {
          const data = await fetchLatestPostId();
          const latestPostId = data.latestPost.id;

          if (latestPostId) {
            return redirect(`/posts/${latestPostId}`);
          }
          return redirect("/home"); // Redirect to Home if no latest post ID is found
        },
        // This child route effectively handles the root redirection
        element: <Home />, // Show Home if directly accessing `/`
      },
      { path: "home", element: <Home /> }, // Home page with blog previews
      { path: "about", element: <About /> }, // About page
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
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
