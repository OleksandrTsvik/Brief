import { RouteObject, createBrowserRouter } from 'react-router-dom';

import AnonymousOutlet from './anonymous.outlet';
import PrivateOutlet from './private.outlet';
import LayoutPage from '../layout/layout.page';
import {
  AdminLoginPage,
  BriefListPage,
  BriefPage,
  BriefCreatePage,
  NotFoundPage,
  BriefUpdatePage,
} from '../pages';

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
      {
        path: 'admin',
        element: <PrivateOutlet />,
        children: [
          {
            path: 'briefs',
            children: [
              { index: true, element: <BriefListPage /> },
              { path: 'create', element: <BriefCreatePage /> },
              { path: 'update/:id', element: <BriefUpdatePage /> },
            ],
          },
        ],
      },
      { path: 'not-found', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
