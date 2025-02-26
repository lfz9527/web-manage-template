// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/Callback/GoogleLogin */
export async function getCallbackGoogleLogin(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/Callback/GoogleLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Callback/Test */
export async function getCallbackTest(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/Callback/Test', {
    method: 'GET',
    ...(options || {}),
  });
}
