import { Link, Outlet } from 'react-router-dom';
import { Footer } from '../components/UI/Footer';
import { Header } from '../components/UI/Header';

function RootLayout() {
  return (
    <>
      <Header>
        <Link to="/">
          <Header.Logo />
        </Link>
      </Header>
      <h1>RootLayout</h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
