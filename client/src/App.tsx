import { App as AntdApp, Layout } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import AuthMiddleware from './auth/auth-middleware';
import { router } from './router/routes';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AntdApp>
        <Layout style={{ minHeight: '100vh' }}>
          <AuthMiddleware>
            <RouterProvider router={router} />
          </AuthMiddleware>
        </Layout>
      </AntdApp>
    </Provider>
  );
}
