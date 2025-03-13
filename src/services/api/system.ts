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

/** 删除系统配置 POST /api/System/DeleteSystemTool */
export async function postSystemDeleteSystemTool(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/DeleteSystemTool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除任务 POST /api/System/DeleteTask */
export async function postSystemDeleteTask(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/DeleteTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id查询系统配置 GET /api/System/GetSystemToolById */
export async function getSystemGetSystemToolById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemGetSystemToolByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/GetSystemToolById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询系统配置列表 GET /api/System/GetSystemToolList */
export async function getSystemGetSystemToolList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemGetSystemToolListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/GetSystemToolList', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // count has a default value: 50
      count: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据Id查询任务 GET /api/System/GetTaskById */
export async function getSystemGetTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemGetTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/GetTaskById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询任务列表 GET /api/System/GetTaskList */
export async function getSystemGetTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemGetTaskListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/GetTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
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

/** 编辑系统配置 POST /api/System/SaveSystemTool */
export async function postSystemSaveSystemTool(
  body: API.FBSystemTool,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/SaveSystemTool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑任务 POST /api/System/SaveTask */
export async function postSystemSaveTask(
  body: API.FBTask,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/System/SaveTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
