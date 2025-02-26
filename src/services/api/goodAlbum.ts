// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量删除商品专辑 POST /api/GoodAlbum/DeleteGoodAlbum */
export async function postGoodAlbumDeleteGoodAlbum(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/DeleteGoodAlbum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除商品帖子 POST /api/GoodAlbum/DeleteGoodPost */
export async function postGoodAlbumDeleteGoodPost(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/DeleteGoodPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除商品帖子喜欢记录 POST /api/GoodAlbum/DeleteGoodPostLike */
export async function postGoodAlbumDeleteGoodPostLike(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/DeleteGoodPostLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询单个商品专辑 GET /api/GoodAlbum/GetGoodAlbumById */
export async function getGoodAlbumGetGoodAlbumById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodAlbumByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodAlbumById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询商品专辑列表 GET /api/GoodAlbum/GetGoodAlbumList */
export async function getGoodAlbumGetGoodAlbumList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodAlbumListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodAlbumList', {
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

/** 前端通用查询专辑列表 GET /api/GoodAlbum/GetGoodAlbumListPublic */
export async function getGoodAlbumGetGoodAlbumListPublic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodAlbumListPublicParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodAlbum/GetGoodAlbumListPublic',
    {
      method: 'GET',
      params: {
        // count has a default value: 10
        count: '10',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询商品帖子单个信息 GET /api/GoodAlbum/GetGoodPostById */
export async function getGoodAlbumGetGoodPostById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodPostByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodPostById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询商品帖子喜欢单条记录 GET /api/GoodAlbum/GetGoodPostLikeById */
export async function getGoodAlbumGetGoodPostLikeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodPostLikeByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodPostLikeById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询商品帖子喜欢列表 GET /api/GoodAlbum/GetGoodPostLikeList */
export async function getGoodAlbumGetGoodPostLikeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodPostLikeListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodPostLikeList', {
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

/** 查询商品帖子列表 GET /api/GoodAlbum/GetGoodPostList */
export async function getGoodAlbumGetGoodPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodAlbumGetGoodPostListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/GetGoodPostList', {
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

/** 前端通用发布商品帖子 POST /api/GoodAlbum/InsertGoodPost */
export async function postGoodAlbumInsertGoodPost(
  body: API.FBGoodPost,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/InsertGoodPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增商品帖子喜欢记录 POST /api/GoodAlbum/InsertGoodPostLike */
export async function postGoodAlbumInsertGoodPostLike(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/InsertGoodPostLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改专辑为公开私有 POST /api/GoodAlbum/PrivateGoodAlbum */
export async function postGoodAlbumPrivateGoodAlbum(
  body: API.FBState,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/PrivateGoodAlbum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增/修改商品专辑 POST /api/GoodAlbum/SaveGoodAlbum */
export async function postGoodAlbumSaveGoodAlbum(
  body: API.FBGoodAlbum,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/SaveGoodAlbum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改商品帖子 POST /api/GoodAlbum/UpdateGoodPost */
export async function postGoodAlbumUpdateGoodPost(
  body: API.FBGoodPost,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/GoodAlbum/UpdateGoodPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
