import { request } from '@umijs/max';

export async function get(url: string, options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>(url, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function post(
  url: string,
  body: any,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
