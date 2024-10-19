import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { fetchLatestPostId } from '../../shared/services/blogPostService.js';

import '../../shared/styles/index.css';
import SignUp from '../../shared/pages/SignUp/SignUp.jsx';
import Home from '../../shared/pages/Home/Home.jsx';
import About from '../../shared/pages/About/About';
import LogIn from '../../shared/pages/LogIn/LogIn.jsx';
import Layout from '../../shared/components/Layout/Layout.jsx';
import BlogPost from '../../shared/pages/BlogPost/BlogPost.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // Remove the loader from the root path
    children: [
      {
        path: '',
        loader: () => {
          return redirect('/home');
        },
      },
      { path: 'home', element: <Home /> }, // Home page with blog previews
      { path: 'about', element: <About /> }, // About page
      { path: 'login', element: <LogIn /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'posts/:postId', // Dynamic route for a specific blog post
        element: <BlogPost />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
