// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询图片列表 GET /api/Image/GetImageList */
export async function getImageGetImageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getImageGetImageListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Image/GetImageList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增一条图片数据 POST /api/Image/InsertImage */
export async function postImageInsertImage(
  body: API.FBImage,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Image/InsertImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传图片 POST /api/Image/UploadImage */
export async function postImageUploadImage(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.REWebApiCallback>('/api/Image/UploadImage', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 上传一个第三方链接到本地 POST /api/Image/UploadImageByUrl */
export async function postImageUploadImageByUrl(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Image/UploadImageByUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
