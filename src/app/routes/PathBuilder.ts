import { LOG_PAGE_ROUTE } from './routes';

export class PathBuilder {
  static getErrorsLogByType = (typeId: number) => `${LOG_PAGE_ROUTE}?type=${typeId}`;
}
