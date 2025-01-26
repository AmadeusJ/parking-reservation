import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/404';
import MainPage from '../pages/MainPage';
import ReservationPage from '../pages/reservation/ReservationPage';
import RootLayout from '../pages/RootLayout';
import MyPage from '../pages/user/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // 메인 페이지 - [page01]
      {
        index: true,
        element: <MainPage />,
      },
      // 예약 진행 페이지 - [page02]
      {
        path: '/reservation',
        element: <ReservationPage />,
      },
      // 마이 페이지 - [page04]
      {
        path: '/my',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
