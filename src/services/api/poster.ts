// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量删除广告 POST /api/Poster/DeletePoster */
export async function postPosterDeletePoster(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Poster/DeletePoster', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询单条广告 GET /api/Poster/GetPosterById */
export async function getPosterGetPosterById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPosterGetPosterByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Poster/GetPosterById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询广告列表 GET /api/Poster/GetPosterList */
export async function getPosterGetPosterList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPosterGetPosterListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Poster/GetPosterList', {
    method: 'GET',
    params: {
      // count has a default value: 50
      count: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 上下线广告 POST /api/Poster/OnlinePoster */
export async function postPosterOnlinePoster(
  body: API.FBState,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Poster/OnlinePoster', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增/修改广告 POST /api/Poster/SavePoster */
export async function postPosterSavePoster(
  body: API.FBPoster,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Poster/SavePoster', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
