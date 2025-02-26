// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除指定日志文件 POST /api/Log/DeleteTextLog */
export async function postLogDeleteTextLog(
  body: API.FBLogText,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Log/DeleteTextLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 后台查询错误日志列表 GET /api/Log/GetLogList */
export async function getLogGetLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLogGetLogListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Log/GetLogList', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // count has a default value: 10
      count: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 读取单个日志文件内容 GET /api/Log/GetTextLogDetails */
export async function getLogGetTextLogDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLogGetTextLogDetailsParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Log/GetTextLogDetails', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取日记文件列表 GET /api/Log/GetTextLogList */
export async function getLogGetTextLogList(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/Log/GetTextLogList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户日志列表 GET /api/Log/GetUserLogList */
export async function getLogGetUserLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLogGetUserLogListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Log/GetUserLogList', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // count has a default value: 10
      count: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 清空全部日志（物理删除） POST /api/Log/TrueDeleteLog */
export async function postLogTrueDeleteLog(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/Log/TrueDeleteLog', {
    method: 'POST',
    ...(options || {}),
  });
}
