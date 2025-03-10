// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 清理静态资源缓存 GET /api/System/ClearStaticFileCache */
export async function getSystemClearStaticFileCache(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/System/ClearStaticFileCache', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 举报 POST /api/System/InsertReport */
export async function postSystemInsertReport(
  body: API.FBReport,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/InsertReport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
