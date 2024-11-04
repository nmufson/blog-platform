import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';

import './styles/index.css';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
import Layout from './components/Layout/Layout.jsx';
import BlogPost from './pages/BlogPost/BlogPost.jsx';
import NewPost from './pages/NewPost/NewPost.jsx';

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
      { path: 'home', element: <Home /> },
      { path: 'login', element: <LogIn /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'posts/:postId',
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
