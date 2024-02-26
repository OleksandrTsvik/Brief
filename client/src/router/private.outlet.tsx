import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/use-auth';

export default function PrivateOutlet() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
