// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量删除品牌 POST /api/Brand/DeleteBrand */
export async function postBrandDeleteBrand(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Brand/DeleteBrand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询品牌详情 GET /api/Brand/GetBrandById */
export async function getBrandGetBrandById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBrandGetBrandByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Brand/GetBrandById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询品牌列表 GET /api/Brand/GetBrandList */
export async function getBrandGetBrandList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBrandGetBrandListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Brand/GetBrandList', {
    method: 'GET',
    params: {
      // count has a default value: 50
      count: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑/新增品牌 POST /api/Brand/SaveBrand */
export async function postBrandSaveBrand(
  body: API.FBBrand,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Brand/SaveBrand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
