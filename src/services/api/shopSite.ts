// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除单个站点 POST /api/ShopSite/DeleteShopSite */
export async function postShopSiteDeleteShopSite(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/DeleteShopSite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑站点信息[传id为修改，不传id为新增] POST /api/ShopSite/EditShopSite */
export async function postShopSiteEditShopSite(
  body: API.FBShopSite,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/EditShopSite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询单条站点信息 GET /api/ShopSite/GetShopSiteById */
export async function getShopSiteGetShopSiteById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShopSiteGetShopSiteByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/GetShopSiteById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询收录的站点列表（后台） GET /api/ShopSite/GetShopSiteList */
export async function getShopSiteGetShopSiteList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShopSiteGetShopSiteListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/GetShopSiteList', {
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

/** 查询收录的站点列表前端公共接口 GET /api/ShopSite/GetShopSiteListPublic */
export async function getShopSiteGetShopSiteListPublic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShopSiteGetShopSiteListPublicParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/GetShopSiteListPublic', {
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

/** 加入我们提交站点 POST /api/ShopSite/InsertShopSiteJoin */
export async function postShopSiteInsertShopSiteJoin(
  body: API.FBShopSiteJoin,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/ShopSite/InsertShopSiteJoin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
