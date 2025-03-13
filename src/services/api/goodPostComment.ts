// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量删除帖子评论 POST /api/GoodPostComment/DeleteGoodPostComment */
export async function postGoodPostCommentDeleteGoodPostComment(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodPostComment/DeleteGoodPostComment',
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

/** 根据Id查询帖子评论 GET /api/GoodPostComment/GetGoodPostCommentById */
export async function getGoodPostCommentGetGoodPostCommentById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodPostCommentGetGoodPostCommentByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodPostComment/GetGoodPostCommentById',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询帖子评论列表 GET /api/GoodPostComment/GetGoodPostCommentList */
export async function getGoodPostCommentGetGoodPostCommentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodPostCommentGetGoodPostCommentListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodPostComment/GetGoodPostCommentList',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询评论列表并带子评论 GET /api/GoodPostComment/GetGoodPostCommentListAndChild */
export async function getGoodPostCommentGetGoodPostCommentListAndChild(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodPostCommentGetGoodPostCommentListAndChildParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodPostComment/GetGoodPostCommentListAndChild',
    {
      method: 'GET',
      params: {
        // page has a default value: 1
        page: '1',
        // count has a default value: 10
        count: '10',
        // childCount has a default value: 3
        childCount: '3',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 发表帖子评论 POST /api/GoodPostComment/InsertGoodPostComment */
export async function postGoodPostCommentInsertGoodPostComment(
  body: API.FBGoodPostComment,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>(
    '/api/GoodPostComment/InsertGoodPostComment',
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
