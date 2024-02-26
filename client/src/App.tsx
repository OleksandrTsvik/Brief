import { App as AntdApp, ConfigProvider, Layout } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import AuthMiddleware from './auth/auth-middleware';
import { router } from './router/routes';
import { store } from './store';
import './app.css';

export default function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{ components: { Layout: { headerHeight: 50 } } }}>
        <AntdApp>
          <Layout className="app__wrapper">
            <AuthMiddleware>
              <RouterProvider router={router} />
            </AuthMiddleware>
          </Layout>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
}
