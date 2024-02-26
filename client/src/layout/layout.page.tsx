import { Outlet } from 'react-router-dom';

import Footer from './footer';
import Main from './main';
import Navbar from './navbar';

export default function LayoutPage() {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
