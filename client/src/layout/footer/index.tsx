import { Layout } from 'antd';
import { Link } from 'react-router-dom';

export default function Footer() {
  const email = 'ipz203_tsos@student.ztu.edu.ua';

  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      © 2024. Copyright:&ensp;
      <Link to={`mailto:${email}`}>{email}</Link>
    </Layout.Footer>
  );
}
