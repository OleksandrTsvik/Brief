import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/use-auth';

export default function AnonymousOutlet() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
