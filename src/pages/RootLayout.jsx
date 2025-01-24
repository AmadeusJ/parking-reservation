import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <h1>RootLayout</h1>
      <Outlet />
    </>
  );
}

export default RootLayout;
