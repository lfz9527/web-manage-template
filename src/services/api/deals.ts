// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除优惠券 POST /api/Deals/DeleteDeals */
export async function postDealsDeleteDeals(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/DeleteDeals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询优惠券提交列表 GET /api/Deals/GetDealJoinList */
export async function getDealsGetDealJoinList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDealsGetDealJoinListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealJoinList', {
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

/** 根据Id查询单件优惠券 GET /api/Deals/GetDealsById */
export async function getDealsGetDealsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDealsGetDealsByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealsById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询优惠券过期时间类型列表 GET /api/Deals/GetDealsExpireTypeList */
export async function getDealsGetDealsExpireTypeList(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealsExpireTypeList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 后台查询优惠券列表 GET /api/Deals/GetDealsList */
export async function getDealsGetDealsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDealsGetDealsListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealsList', {
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

/** 前端公共查询优惠券 GET /api/Deals/GetDealsListPublic */
export async function getDealsGetDealsListPublic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDealsGetDealsListPublicParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealsListPublic', {
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

/** 查询优惠券类型列表 GET /api/Deals/GetDealsTypeList */
export async function getDealsGetDealsTypeList(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/Deals/GetDealsTypeList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 优惠券上下热门 POST /api/Deals/HotDeals */
export async function postDealsHotDeals(
  body: API.FBState,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/HotDeals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 提交优惠信息 POST /api/Deals/InsertDealJoin */
export async function postDealsInsertDealJoin(
  body: API.FBDealJoin,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/InsertDealJoin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑一个优惠券（dealsId=0为新增，dealsId>0为修改） POST /api/Deals/SaveDeals */
export async function postDealsSaveDeals(
  body: API.FBDeals,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/SaveDeals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 优惠券上下架 POST /api/Deals/ShelvesDeals */
export async function postDealsShelvesDeals(
  body: API.FBState,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Deals/ShelvesDeals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
