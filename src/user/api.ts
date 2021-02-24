import { get } from '@waldur/core/api';

export const getUserMonthlyActivity = (userUrl: string) =>
  get('/events-stats/', {
    params: {
      scope: userUrl,
      page_size: 12,
    },
  }).then((response) => response.data);

export const getUserChecklistScore = (userUuid: string) =>
  get<{ score: number }>(
    `/users/${userUuid}/marketplace-checklist-stats/`,
  ).then((response) => response.data);