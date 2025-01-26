import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Footer } from '../components/UI/Footer';
import { Header } from '../components/UI/Header';
import { Text } from '../components/UI/Text';

function RootLayout() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
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
        <Button btnColor="white" onClick={() => navigate('/my')} width="200px">
          <Text>{`${user.name} 님의 예약`}</Text>
        </Button>
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
