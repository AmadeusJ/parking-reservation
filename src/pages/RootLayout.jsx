import { Link, Outlet } from 'react-router-dom';
import { Footer } from '../components/UI/Footer';
import { Header } from '../components/UI/Header';

function RootLayout() {
  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        width: '100%',
        height: '100%',
      }}
    >
      <Header>
        <Link to="/">
          <Header.Logo />
        </Link>
      </Header>
      <section
        css={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}

export default RootLayout;
