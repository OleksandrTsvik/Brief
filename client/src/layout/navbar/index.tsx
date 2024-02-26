import { LoginOutlined } from '@ant-design/icons';
import { Menu, Button, Layout } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import styles from './navbar.module.css';
import { resetAuthState } from '../../auth/auth.slice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/use-auth';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const appDispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const menuItems: ItemType[] = useMemo(() => {
    let adminItems: ItemType[] = [];

    if (isAuth) {
      adminItems = [
        { key: '/admin/briefs', label: 'Брифи' },
        { key: '/admin/completed-briefs', label: 'Завершені брифи' },
      ];
    }

    return [{ key: '/', label: 'Головна' }, ...adminItems];
  }, [isAuth]);

  return (
    <Layout.Header>
      <div className={styles.headerWrapper}>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          items={menuItems}
          selectedKeys={[location.pathname]}
          onSelect={({ key }) => navigate(key)}
        />
        {!isAuth ? (
          <Link to="/admin/login">
            <Button icon={<LoginOutlined />} />
          </Link>
        ) : (
          <Button onClick={() => appDispatch(resetAuthState())}>Вийти</Button>
        )}
      </div>
    </Layout.Header>
  );
}
