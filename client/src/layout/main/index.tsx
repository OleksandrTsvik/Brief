import { Layout, theme } from 'antd';

import styles from './main.module.css';

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout.Content
      className={styles.main}
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </Layout.Content>
  );
}
