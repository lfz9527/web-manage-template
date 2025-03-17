// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量生成虚拟账号 POST /api/User/BatchAddUserOfVirtual */
export async function postUserBatchAddUserOfVirtual(
  body: API.FBCount,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/BatchAddUserOfVirtual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 校验验证码 POST /api/User/CheckEmailCodeAsync */
export async function postUserCheckEmailCodeAsync(
  body: API.FBCheckEmailCode,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/CheckEmailCodeAsync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 校验邮箱是否存在 GET /api/User/CheckEmailExists */
export async function getUserCheckEmailExists(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCheckEmailExistsParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/CheckEmailExists', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录状态校验 POST /api/User/CheckLogin */
export async function postUserCheckLogin(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/User/CheckLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 管理员登录状态校验 POST /api/User/CheckLoginAdmin */
export async function postUserCheckLoginAdmin(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/User/CheckLoginAdmin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 批量删除用户关联第三方平台 POST /api/User/DeleteProvider */
export async function postUserDeleteProvider(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/DeleteProvider', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户关注 POST /api/User/DeleteUserFollow */
export async function postUserDeleteUserFollow(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/DeleteUserFollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除用户关联第三方平台 POST /api/User/DeleteUserProvider */
export async function postUserDeleteUserProvider(
  body: API.FBIds,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/DeleteUserProvider', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询单个用户关联第三方平台 GET /api/User/GetProviderById */
export async function getUserGetProviderById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetProviderByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetProviderById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户关联第三方平台列表 POST /api/User/GetProviderList */
export async function postUserGetProviderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postUserGetProviderListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetProviderList', {
    method: 'POST',
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

/** 查询用户关注列表 GET /api/User/GetUserFollowList */
export async function getUserGetUserFollowList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetUserFollowListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetUserFollowList', {
    method: 'GET',
    params: {
      // isFollowing has a default value: true
      isFollowing: 'true',
      // page has a default value: 1
      page: '1',
      // count has a default value: 50
      count: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取单个用户信息 GET /api/User/GetUserForPublic */
export async function getUserGetUserForPublic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetUserForPublicParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetUserForPublic', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户列表 GET /api/User/GetUserList */
export async function getUserGetUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetUserListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetUserList', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // count has a default value: 20
      count: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询单个用户关联第三方平台 GET /api/User/GetUserProviderById */
export async function getUserGetUserProviderById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetUserProviderByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetUserProviderById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户关联第三方平台列表 GET /api/User/GetUserProviderList */
export async function getUserGetUserProviderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGetUserProviderListParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/GetUserProviderList', {
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

/** 新增用户关注 POST /api/User/InsertUserFollow */
export async function postUserInsertUserFollow(
  body: API.FBId,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/InsertUserFollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员登录 POST /api/User/LoginByAdmin */
export async function postUserLoginByAdmin(
  body: API.FBUserLogin,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/LoginByAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 账号密码登录 POST /api/User/LoginByUserPwd */
export async function postUserLoginByUserPwd(
  body: API.FBUserLogin,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/LoginByUserPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 POST /api/User/LoginOut */
export async function postUserLoginOut(options?: { [key: string]: any }) {
  return request<API.REWebApiCallback>('/api/User/LoginOut', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 重置密码 POST /api/User/RecoveryUserPwd */
export async function postUserRecoveryUserPwd(
  body: API.FBRecoveryUserPwd,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/RecoveryUserPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过邮箱注册 POST /api/User/RegisterUserForEmail */
export async function postUserRegisterUserForEmail(
  body: API.FBRegisterUser,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/RegisterUserForEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增/修改用户关联第三方平台 POST /api/User/SaveProvider */
export async function postUserSaveProvider(
  body: API.FBProvider,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/SaveProvider', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增用户关联第三方平台 POST /api/User/SaveUserProvider */
export async function postUserSaveUserProvider(
  body: API.FBUserProvider,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/SaveUserProvider', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /api/User/SendEmailCode */
export async function postUserSendEmailCode(
  body: API.FBEmailCode,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/SendEmailCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户密码 POST /api/User/UpdateUserPwd */
export async function postUserUpdateUserPwd(
  body: API.FBUserUpdatePwd,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/User/UpdateUserPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
