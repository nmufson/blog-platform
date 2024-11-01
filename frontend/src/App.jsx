import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';

import './styles/index.css';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About';
import LogIn from './pages/LogIn/LogIn.jsx';
import Layout from './components/Layout/Layout.jsx';
import BlogPost from './pages/BlogPost/BlogPost.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
