import { Route, Routes } from 'react-router-dom';
import { HOME_PAGE_ROUTE, LOG_PAGE_ROUTE, MANAGE_PAGE_ROUTE } from './routes';
import { HomePage } from '../../pages/home';
import { UserLayout } from '../../pages/_layouts/UserLayout';
import { LogPage } from '../../pages/log';
import { ManagePage } from '../../pages/manage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
        <Route path={LOG_PAGE_ROUTE} element={<LogPage />} />
        <Route path={MANAGE_PAGE_ROUTE} element={<ManagePage />} />
      </Route>
    </Routes>
  );
};
