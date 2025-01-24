import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/404';
import MainPage from '../pages/MainPage';
import ReservationPage from '../pages/reservation/ReservationPage';
import ReservationResultPage from '../pages/reservation/ReservationResultPage';
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
      // 예약 결과 페이지 - [page03]
      {
        path: '/reservation/result',
        element: <ReservationResultPage />,
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
