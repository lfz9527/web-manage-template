// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增爬虫日志 POST /api/Crawler/AddCrawlerLog */
export async function postCrawlerAddCrawlerLog(
  body: API.FBCrawlerLog,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/AddCrawlerLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除爬虫关键词数据 POST /api/Crawler/DeleteCrawlerKeyword */
export async function postCrawlerDeleteCrawlerKeyword(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/DeleteCrawlerKeyword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除爬虫日志 POST /api/Crawler/DeleteCrawlerLog */
export async function postCrawlerDeleteCrawlerLog(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/DeleteCrawlerLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id查询单个爬虫关键词 GET /api/Crawler/GetCrawlerKeywordById */
export async function getCrawlerGetCrawlerKeywordById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetCrawlerKeywordByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetCrawlerKeywordById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询爬虫关键词列表 GET /api/Crawler/GetCrawlerKeywordList */
export async function getCrawlerGetCrawlerKeywordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetCrawlerKeywordListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetCrawlerKeywordList', {
    method: 'GET',
    params: {
      // count has a default value: 50
      count: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据Id查询爬虫日志 GET /api/Crawler/GetCrawlerLogById */
export async function getCrawlerGetCrawlerLogById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetCrawlerLogByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetCrawlerLogById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询爬虫日志列表 GET /api/Crawler/GetCrawlerLogList */
export async function getCrawlerGetCrawlerLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCrawlerGetCrawlerLogListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/GetCrawlerLogList', {
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

/** 修改爬虫关键词数据 POST /api/Crawler/SaveCrawlerKeyword */
export async function postCrawlerSaveCrawlerKeyword(
  body: API.FBCrawlerKeyword,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Crawler/SaveCrawlerKeyword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
