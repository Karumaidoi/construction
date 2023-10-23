/* eslint-disable import/no-named-as-default */
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BidsTable from './layouts/bids/BidsTable';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: 'app',
          element: <DashboardAppPage />,
        },
        { path: 'projects', element: <ProductsPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'bids', element: <BidsTable /> },
        { path: 'settings', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
