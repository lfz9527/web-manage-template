// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询分销商品列表 GET /api/Crawler/GetDistributionGoodList */
export async function getCrawlerGetDistributionGoodList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetDistributionGoodListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetDistributionGoodList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询爬虫商品列表 GET /api/Crawler/GetRepliteGoodList */
export async function getCrawlerGetRepliteGoodList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetRepliteGoodListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetRepliteGoodList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询爬虫关键词列表 GET /api/Crawler/GetRepliteKeyword */
export async function getCrawlerGetRepliteKeyword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetRepliteKeywordParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetRepliteKeyword', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
