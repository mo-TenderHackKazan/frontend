import { Route, Routes } from 'react-router-dom';
import { HOME_PAGE_ROUTE } from './routes';
import { HomePage } from '../../pages/home';
import { UserLayout } from '../../pages/_layouts/UserLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
      </Route>
    </Routes>
  );
};
