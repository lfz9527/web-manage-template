// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除友情链接 POST /api/FriendLink/DeleteFriendLink */
export async function postFriendLinkDeleteFriendLink(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/FriendLink/DeleteFriendLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id查询友情链接 GET /api/FriendLink/GetFriendLinkById */
export async function getFriendLinkGetFriendLinkById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFriendLinkGetFriendLinkByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/FriendLink/GetFriendLinkById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询友情链接列表 GET /api/FriendLink/GetFriendLinkList */
export async function getFriendLinkGetFriendLinkList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFriendLinkGetFriendLinkListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/FriendLink/GetFriendLinkList', {
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

/** 编辑友情链接 POST /api/FriendLink/SaveFriendLink */
export async function postFriendLinkSaveFriendLink(
  body: API.FBFriendLink,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/FriendLink/SaveFriendLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
