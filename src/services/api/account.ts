// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传用户头像，如果为空则生成默认头像 POST /api/Account/AddUserForHeadImg */
export async function postAccountAddUserForHeadImg(
  body: API.FBHeadImage,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/AddUserForHeadImg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取随机用户昵称 GET /api/Account/AddUserForNickName */
export async function getAccountAddUserForNickName(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/Account/AddUserForNickName', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询邮箱状态 GET /api/Account/GetEmailState */
export async function getAccountGetEmailState(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetEmailStateParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetEmailState', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据第三方平台名称查询指定第三方平台 GET /api/Account/GetProviderByAction */
export async function getAccountGetProviderByAction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetProviderByActionParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetProviderByAction', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有第三方平台列表 GET /api/Account/GetProviderListAll */
export async function getAccountGetProviderListAll(options?: {
  [key: string]: any;
}) {
  return request<API.REWebApiCallback>('/api/Account/GetProviderListAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据账户名/邮箱查询用户 GET /api/Account/GetUserByAccount */
export async function getAccountGetUserByAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserByAccountParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserByAccount', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据邮箱查询用户 GET /api/Account/GetUserByEmail */
export async function getAccountGetUserByEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserByEmailParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserByEmail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户Id查询用户 GET /api/Account/GetUserById */
export async function getAccountGetUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据手机查询用户 GET /api/Account/GetUserByPhone */
export async function getAccountGetUserByPhone(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserByPhoneParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserByPhone', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据游客Id查询用户 GET /api/Account/GetUserByVisotorId */
export async function getAccountGetUserByVisotorId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserByVisotorIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserByVisotorId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据第三方用户Id查询第三方用户信息 GET /api/Account/GetUserProviderByUserId */
export async function getAccountGetUserProviderByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountGetUserProviderByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/GetUserProviderByUserId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 直接修改密码 GET /api/Account/UpdateUserPassword */
export async function getAccountUpdateUserPassword(
  body: API.FBUpdateUserPassword,
  options?: { [key: string]: any },
) {
  return request<API.REWebApiCallback>('/api/Account/UpdateUserPassword', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
