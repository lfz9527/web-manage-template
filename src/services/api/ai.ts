// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除AI提示词 POST /api/AI/DeleteAIPromptWord */
export async function postAiDeleteAiPromptWord(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/AI/DeleteAIPromptWord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Id查询AI提示词 GET /api/AI/GetAIPromptWordById */
export async function getAiGetAiPromptWordById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAIGetAIPromptWordByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/AI/GetAIPromptWordById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询AI提示词列表 GET /api/AI/GetAIPromptWordList */
export async function getAiGetAiPromptWordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAIGetAIPromptWordListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/AI/GetAIPromptWordList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询提示词场景列表 GET /api/AI/GetAIPromptWordScencList */
export async function getAiGetAiPromptWordScencList(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/AI/GetAIPromptWordScencList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 编辑AI提示词 POST /api/AI/SaveAIPromptWord */
export async function postAiSaveAiPromptWord(
  body: API.FBAIPromptWord,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/AI/SaveAIPromptWord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
