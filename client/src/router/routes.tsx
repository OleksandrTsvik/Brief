import { RouteObject, createBrowserRouter } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <>Layout</>,
    children: [],
  },
];

export const router = createBrowserRouter(routes);
