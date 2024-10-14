import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import { fetchLatestPostId } from '../../shared/services/blogPostService';

import SignUp from '../../shared/pages/SignUp/SignUp.jsx';
import '../../shared/styles/index.css';
import Home from '../../shared/pages/Home/Home.jsx';
import About from '../../shared/pages/About/About';
import LogIn from '../../shared/pages/LogIn/LogIn.jsx';
import Layout from '../../shared/components/Layout/Layout.jsx';
import BlogPost from '../../shared/pages/BlogPost/BlogPost.jsx';
import NewPost from './pages/NewPost.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // Remove the loader from the root path
    children: [
      {
        path: '',
        loader: async () => {
          const data = await fetchLatestPostId();
          const latestPostId = data.latestPost.id;

          if (latestPostId) {
            return redirect(`/posts/${latestPostId}`);
          }
          return redirect('/home'); // Redirect to Home if no latest post ID is found
        },
        // This child route effectively handles the root redirection
        element: <Home />, // Show Home if directly accessing `/`
      },
      { path: 'home', element: <Home /> }, // Home page with blog previews
      { path: 'about', element: <About /> }, // About page
      { path: 'login', element: <LogIn /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'posts/:postId', // Dynamic route for a specific blog post
        element: <BlogPost />,
      },
      { path: 'newpost', element: <NewPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
