// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据 trackerId 获取域名列表 GET /api/DataStatistics/GetDomain */
export async function getDataStatisticsGetDomain(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataStatisticsGetDomainParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/DataStatistics/GetDomain', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 代理获取统计数据 GET /api/DataStatistics/GetSourceCount */
export async function getDataStatisticsGetSourceCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataStatisticsGetSourceCountParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/DataStatistics/GetSourceCount', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 代理获取统计数据 GET /api/DataStatistics/GetStatsHourly */
export async function getDataStatisticsGetStatsHourly(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataStatisticsGetStatsHourlyParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/DataStatistics/GetStatsHourly', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 代理获取追踪器列表 GET /api/DataStatistics/GetTrack */
export async function getDataStatisticsGetTrack(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataStatisticsGetTrackParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/DataStatistics/GetTrack', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
