import { RouteObject, createBrowserRouter } from 'react-router-dom';

import AnonymousOutlet from './anonymous.outlet';
import PrivateOutlet from './private.outlet';
import LayoutPage from '../layout/layout.page';
import { AdminLoginPage, BriefPage, NotFoundPage } from '../pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { index: true, element: <BriefPage /> },
      {
        path: 'admin/login',
        element: <AnonymousOutlet />,
        children: [{ index: true, element: <AdminLoginPage /> }],
      },
      { path: 'admin', element: <PrivateOutlet />, children: [] },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
