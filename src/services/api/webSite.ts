// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除单个站群 POST /api/WebSite/DeleteWebSite */
export async function postWebSiteDeleteWebSite(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/DeleteWebSite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除站点配置项 POST /api/WebSite/DeleteWebSiteSetting */
export async function postWebSiteDeleteWebSiteSetting(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/DeleteWebSiteSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除站点设置值 POST /api/WebSite/DeleteWebSiteSettingValue */
export async function postWebSiteDeleteWebSiteSettingValue(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/WebSite/DeleteWebSiteSettingValue',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 查询模板配置文件 GET /api/WebSite/GetSetting */
export async function getWebSiteGetSetting(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/WebSite/GetSetting', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询单条站群信息 GET /api/WebSite/GetWebSiteById */
export async function getWebSiteGetWebSiteById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询站群列表 GET /api/WebSite/GetWebSiteList */
export async function getWebSiteGetWebSiteList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询站点单个配置 GET /api/WebSite/GetWebSiteSetting */
export async function getWebSiteGetWebSiteSetting(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteSettingParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteSetting', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有属性 GET /api/WebSite/GetWebSiteSettingAll */
export async function getWebSiteGetWebSiteSettingAll(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteSettingAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询站点配置列表 GET /api/WebSite/GetWebSiteSettingList */
export async function getWebSiteGetWebSiteSettingList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteSettingListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteSettingList', {
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

/** 查询单条站点设置值 GET /api/WebSite/GetWebSiteSettingValue */
export async function getWebSiteGetWebSiteSettingValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteSettingValueParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/GetWebSiteSettingValue', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询站点设置值列表 GET /api/WebSite/GetWebSiteSettingValueList */
export async function getWebSiteGetWebSiteSettingValueList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteSettingValueListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/WebSite/GetWebSiteSettingValueList',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 【测试专用】获取当前站点所有主题参数值 GET /api/WebSite/GetWebSiteSettingValuePublic */
export async function getWebSiteGetWebSiteSettingValuePublic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWebSiteGetWebSiteSettingValuePublicParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/WebSite/GetWebSiteSettingValuePublic',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 编辑站群信息[传id为修改，不传id为新增] POST /api/WebSite/SaveWebSite */
export async function postWebSiteSaveWebSite(
  body: API.FBWebSite,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/SaveWebSite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增/修改站点设置 POST /api/WebSite/SaveWebSiteSetting */
export async function postWebSiteSaveWebSiteSetting(
  body: API.FBWebSiteSetting,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/SaveWebSiteSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增/修改站点设置值 POST /api/WebSite/SaveWebSiteSettingValue */
export async function postWebSiteSaveWebSiteSettingValue(
  body: API.FBWebSiteSettingValue,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/WebSite/SaveWebSiteSettingValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传本地的站点配置到生产环境 POST /api/WebSite/UploadWebSiteSettingReceiver */
export async function postWebSiteUploadWebSiteSettingReceiver(
  body: API.FBWebSiteSettingReceiver,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/WebSite/UploadWebSiteSettingReceiver',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 上传本地的站点配置到生产环境 POST /api/WebSite/UploadWebSiteSettingSender */
export async function postWebSiteUploadWebSiteSettingSender(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/WebSite/UploadWebSiteSettingSender',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
